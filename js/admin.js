/* ============================================================
   ADMIN DASHBOARD: video lecture manager (admin.html only).
   Lets the site owner add/remove YouTube lectures per chapter
   and download an updated videos.js to publish via git push.
   ============================================================ */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var lockScreen = document.getElementById("lock-screen");
    var dashboard = document.getElementById("dashboard");

    // ---- Passcode gate (casual lock only; see site-config.js note) ----
    var PASS = (typeof SITE !== "undefined" && SITE.adminPasscode) || "sakib123";
    function isUnlocked() {
      try { return sessionStorage.getItem("admin-unlocked") === "yes"; } catch (e) { return false; }
    }
    function showDashboard() {
      lockScreen.hidden = true;
      dashboard.hidden = false;
      initManager();
    }
    if (isUnlocked()) { showDashboard(); return; }

    var passInput = document.getElementById("passcode");
    var lockErr = document.getElementById("lock-err");
    function tryUnlock() {
      if (passInput.value === PASS) {
        try { sessionStorage.setItem("admin-unlocked", "yes"); } catch (e) {}
        showDashboard();
      } else {
        lockErr.textContent = "Wrong passcode. Try again.";
        passInput.select();
      }
    }
    document.getElementById("unlock-btn").addEventListener("click", tryUnlock);
    passInput.addEventListener("keydown", function (e) { if (e.key === "Enter") tryUnlock(); });
  });

  // ---- Manager (runs only after unlock) ----
  var initialised = false;
  function initManager() {
    if (initialised) return;
    initialised = true;

    var chapters = (typeof DOCUMENTS !== "undefined" ? DOCUMENTS : []).map(function (d) {
      return { id: d.id, name: d.chapter };
    });
    // Fallback if DOCUMENTS is missing for any reason
    if (!chapters.length) {
      chapters = [
        { id: "ch1", name: "Chapter 1" }, { id: "ch2", name: "Chapter 2" },
        { id: "ch3p1", name: "Chapter 3 (Part 1)" }, { id: "ch3p2", name: "Chapter 3 (Part 2)" },
        { id: "ch4", name: "Chapter 4" }, { id: "ch5", name: "Chapter 5" }, { id: "ch6", name: "Chapter 6" }
      ];
    }

    var original = JSON.parse(JSON.stringify(typeof VIDEOS !== "undefined" ? VIDEOS : {}));
    var working = JSON.parse(JSON.stringify(original));
    chapters.forEach(function (ch) { if (!Array.isArray(working[ch.id])) working[ch.id] = []; });

    var activeChapter = chapters[0].id;
    var dirtyBadge = document.getElementById("dirty-badge");
    var chapterChips = document.getElementById("chapter-chips");
    var videoList = document.getElementById("video-list");
    var totalCount = document.getElementById("total-count");
    var chapterSelect = document.getElementById("f-chapter");

    chapters.forEach(function (ch) {
      var opt = document.createElement("option");
      opt.value = ch.id;
      opt.textContent = ch.name;
      chapterSelect.appendChild(opt);
    });

    function isDirty() {
      return JSON.stringify(working) !== JSON.stringify(original);
    }
    function refreshDirty() {
      dirtyBadge.hidden = !isDirty();
    }
    function totalVideos() {
      return chapters.reduce(function (n, ch) { return n + (working[ch.id] || []).length; }, 0);
    }

    function esc(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    function renderChips() {
      chapterChips.innerHTML = "";
      chapters.forEach(function (ch) {
        var b = document.createElement("button");
        b.className = "chip" + (ch.id === activeChapter ? " active" : "");
        b.textContent = ch.name + " (" + (working[ch.id] || []).length + ")";
        b.addEventListener("click", function () { activeChapter = ch.id; renderChips(); renderList(); });
        chapterChips.appendChild(b);
      });
      var n = totalVideos();
      totalCount.textContent = n === 1 ? "· 1 video" : "· " + n + " videos";
    }

    function renderList() {
      var vids = working[activeChapter] || [];
      videoList.innerHTML = "";
      if (!vids.length) {
        var p = document.createElement("p");
        p.className = "empty-note";
        p.textContent = "No videos in this chapter yet. Add your first one above.";
        videoList.appendChild(p);
        return;
      }
      vids.forEach(function (v, idx) {
        var row = document.createElement("div");
        row.className = "vid-row";
        var thumb = document.createElement("img");
        thumb.className = "thumb";
        thumb.src = "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
        thumb.alt = "";
        thumb.loading = "lazy";
        var meta = document.createElement("div");
        meta.className = "meta";
        var t = document.createElement("div");
        t.className = "t";
        t.textContent = v.title;
        var i = document.createElement("div");
        i.className = "i";
        i.textContent = v.id;
        meta.appendChild(t);
        meta.appendChild(i);
        var del = document.createElement("button");
        del.className = "btn-danger";
        del.textContent = "Delete";
        del.addEventListener("click", function () {
          if (confirm('Delete "' + v.title + '"?')) {
            working[activeChapter].splice(idx, 1);
            renderChips(); renderList(); refreshDirty(); refreshAnnounce();
          }
        });
        row.appendChild(thumb);
        row.appendChild(meta);
        row.appendChild(del);
        videoList.appendChild(row);
      });
    }

    function extractId(input) {
      input = (input || "").trim();
      if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
      var m = input.match(/(?:youtube\.com\/(?:watch\?[^#]*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
      return m ? m[1] : null;
    }

    var formErr = document.getElementById("form-err");
    var lastAddedKey = null; // "chapterId|videoId" of the video added this session
    document.getElementById("add-btn").addEventListener("click", function () {
      var chId = chapterSelect.value;
      var vid = extractId(document.getElementById("f-url").value);
      var title = document.getElementById("f-title").value.trim();
      formErr.textContent = "";
      if (!vid) { formErr.textContent = "Couldn't find a YouTube video ID in that link. Paste a full youtube.com or youtu.be link."; return; }
      if (!title) { formErr.textContent = "Please give the video a title."; return; }
      var exists = chapters.some(function (ch) {
        return (working[ch.id] || []).some(function (v) { return v.id === vid; });
      });
      if (exists) { formErr.textContent = "This video is already in your list."; return; }
      working[chId].push({ id: vid, title: title });
      lastAddedKey = chId + "|" + vid;
      document.getElementById("f-url").value = "";
      document.getElementById("f-title").value = "";
      activeChapter = chId;
      renderChips(); renderList(); refreshDirty(); refreshAnnounce();
    });

    document.getElementById("download-btn").addEventListener("click", function () {
      var out = [];
      out.push("/* ============================================================");
      out.push("   VIDEO LECTURES: managed from the site dashboard (admin.html).");
      out.push("   To edit by hand, add entries like this inside a chapter's [ ] list:");
      out.push("");
      out.push('     { id: "dQw4w9WgXcQ", title: "What is a Number System?" },');
      out.push("");
      out.push("   id:    the 11-character YouTube video ID (the part after");
      out.push('           "watch?v=" in the video\'s URL)');
      out.push("   title: the title shown on the video card");
      out.push("");
      out.push("   Leave a chapter's list empty [ ] and the site shows a");
      out.push('   tasteful "coming soon" message for that chapter.');
      out.push("   ============================================================ */");
      out.push("");
      out.push("var VIDEOS = {");
      chapters.forEach(function (ch, ci) {
        out.push("  " + ch.id + ": [");
        (working[ch.id] || []).forEach(function (v) {
          out.push("    { id: \"" + v.id + "\", title: " + JSON.stringify(v.title) + " },");
        });
        out.push("  ]" + (ci < chapters.length - 1 ? "," : ""));
      });
      out.push("};");
      out.push("");
      var blob = new Blob([out.join("\n")], { type: "text/javascript" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "videos.js";
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    });

    renderChips();
    renderList();
    refreshDirty();

    // ---- WhatsApp announcement composer ----
    // WhatsApp offers no API for a static site to send messages on its own,
    // so this prepares the announcement text and opens WhatsApp with it
    // prefilled. One tap on the broadcast list sends it to every subscriber.
    var announceVideo = document.getElementById("announce-video");
    var announceText = document.getElementById("announce-text");
    var announceSend = document.getElementById("announce-send");
    var siteBase = (typeof SITE !== "undefined" && SITE.siteUrl) || "https://lecturer-pathan.vercel.app";

    function chapterLabel(id) {
      var ch = chapters.filter(function (c) { return c.id === id; })[0];
      return ch ? ch.name.split(" - ")[0] : id;
    }
    function composeAnnounce() {
      var key = announceVideo.value;
      if (!key) {
        announceText.value = "Add a video above, then pick it here to compose the announcement.";
        announceSend.style.display = "none";
        return;
      }
      announceSend.style.display = "";
      var parts = key.split("|");
      var vids = working[parts[0]] || [];
      var v = vids.filter(function (x) { return x.id === parts[1]; })[0];
      if (!v) { announceText.value = ""; announceSend.style.display = "none"; return; }
      var msg = "New ICT lecture: " + v.title +
        "\n(" + chapterLabel(parts[0]) + ")" +
        "\nWatch it here: " + siteBase + "/lectures.html?v=" + v.id;
      announceText.value = msg;
      announceSend.href = "https://wa.me/?text=" + encodeURIComponent(msg);
    }
    function refreshAnnounce() {
      var keep = announceVideo.value;
      announceVideo.innerHTML = "";
      var keys = [];
      chapters.forEach(function (ch) {
        var grp = document.createElement("optgroup");
        grp.label = ch.name;
        var any = false;
        (working[ch.id] || []).forEach(function (v) {
          var opt = document.createElement("option");
          opt.value = ch.id + "|" + v.id;
          opt.textContent = v.title;
          grp.appendChild(opt);
          keys.push(opt.value);
          any = true;
        });
        if (any) announceVideo.appendChild(grp);
      });
      if (!keys.length) {
        announceVideo.disabled = true;
      } else {
        announceVideo.disabled = false;
        announceVideo.value = (lastAddedKey && keys.indexOf(lastAddedKey) !== -1)
          ? lastAddedKey
          : (keys.indexOf(keep) !== -1 ? keep : keys[keys.length - 1]);
      }
      composeAnnounce();
    }
    announceVideo.addEventListener("change", composeAnnounce);
    refreshAnnounce();
  }
})();
