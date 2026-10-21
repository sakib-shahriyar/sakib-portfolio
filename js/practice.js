/* Practice tests: chapterwise, whole-book and board-paper MCQ exams.
   Instant results with explanations. */
(function () {
  var SUBJECTS = {
    hsc:    { bankUrl: "assets/mcq/hsc-ict-mcq-bank.json?v=45",   title: "NCTB HSC ICT" },
    olevel: { bankUrl: "assets/mcq/olevel-cs-mcq-bank.json", title: "Cambridge O Level CS" },
    board:  { bankUrl: "assets/mcq/hsc-board-papers.json?v=7", title: "Board Papers · HSC ICT" }
  };
  var TEST_LEN = 25;
  var TEST_SECS = 20 * 60;
  var LETTERS = ["A", "B", "C", "D"];

  var banks = {};  // subject key -> bank JSON (cached)
  var boardBank = null; // board papers bank, loaded into the Board papers card
  var bank = null; // current subject's bank
  var subject = null; // current subject key
  var state = null; // { title, chapterwise, chapterNo, questions, picked, deadline, timerId, submitted, warned, auto }

  function $(id) { return document.getElementById(id); }

  function show(viewId) {
    ["view-landing", "view-setup", "view-test", "view-result"].forEach(function (id) {
      $(id).hidden = (id !== viewId);
    });
    window.scrollTo(0, 0);
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  // Prepare one question: reshuffle options, remap the correct answer.
  function prepQuestion(q, chapterTitle) {
    var order = shuffle(q.options.map(function (text, i) {
      return { text: text, correct: i === q.answer };
    }));
    var answer = 0;
    order.forEach(function (o, i) { if (o.correct) answer = i; });
    return {
      id: q.id,
      question: q.question,
      options: order.map(function (o) { return o.text; }),
      answer: answer,
      explanation: q.explanation,
      chapter: chapterTitle,
      figure: q.figure || null,
      passage: q.passage || null
    };
  }

  function collapsePickers(except) {
    if (except !== "chapter") {
      $("chapter-picker").hidden = true;
      $("type-chapterwise").classList.remove("is-expanded");
      $("chapterwise-link").textContent = "Choose chapter \u2192";
    }
    if (except !== "paper") {
      $("paper-picker").hidden = true;
      $("type-boardpapers").classList.remove("is-expanded");
      $("boardpapers-link").textContent = "Choose a paper \u2192";
    }
  }

  function openChapterPicker() {
    collapsePickers("chapter");
    $("chapter-picker").hidden = false;
    $("type-chapterwise").classList.add("is-expanded");
    $("chapterwise-link").textContent = "Hide chapters \u2191";
  }

  function openPaperPicker() {
    collapsePickers("paper");
    $("paper-picker").hidden = false;
    $("type-boardpapers").classList.add("is-expanded");
    $("boardpapers-link").textContent = "Hide papers \u2191";
    if (boardBank) { renderPaperPicker(); return; }
    $("paper-groups").innerHTML = '<p class="picker-loading">Loading board papers\u2026</p>';
    fetch(SUBJECTS.board.bankUrl).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    }).then(function (data) {
      boardBank = data;
      banks.board = data;
      renderPaperPicker();
    }).catch(function () {
      $("paper-groups").innerHTML = '<p class="picker-loading">Could not load the board papers. Please check your connection and try again.</p>';
    });
  }

  function showSetup(key) {
    subject = key;
    bank = null;
    $("setup-title").textContent = SUBJECTS[key].title;
    $("setup-sub").textContent = "25 questions. 20 minutes. Pick how you want to be tested.";
    collapsePickers();
    var types = $("setup-types");
    if (key === "hsc") {
      types.classList.remove("grid-2");
      types.classList.add("grid-3");
      $("type-boardpapers").hidden = false;
    } else {
      types.classList.remove("grid-3");
      types.classList.add("grid-2");
      $("type-boardpapers").hidden = true;
    }
    show("view-setup");
    loadBank(function () {});
  }

  function afterBankLoad() {
    $("setup-loading").hidden = true;
    $("setup-types").hidden = false;
    $("wholebook-desc").textContent =
      "25 questions drawn from all " + bank.chapters.length + " chapters, mixed together.";
    renderChapterGrid();
  }

  function loadBank(cb) {
    if (banks[subject]) {
      bank = banks[subject];
      afterBankLoad();
      cb(bank);
      return;
    }
    $("setup-loading").hidden = false;
    $("setup-types").hidden = true;
    fetch(SUBJECTS[subject].bankUrl).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    }).then(function (data) {
      banks[subject] = data;
      bank = data;
      afterBankLoad();
      cb(bank);
    }).catch(function () {
      $("setup-loading").textContent = "Could not load the question bank. Please check your connection and try again.";
    });
  }

  function chapterTitle(ch) {
    return "Chapter " + ch.number + ": " + ch.title;
  }

  function paperTitle(ch) {
    return ch.board + " Board " + ch.year;
  }

  function renderPaperPicker() {
    var wrap = $("paper-groups");
    wrap.innerHTML = "";
    var byYear = {};
    boardBank.chapters.forEach(function (ch) {
      (byYear[ch.year] = byYear[ch.year] || []).push(ch);
    });
    Object.keys(byYear).sort(function (a, b) { return b - a; }).forEach(function (year) {
      var h = document.createElement("h3");
      h.className = "picker-title";
      h.textContent = year;
      wrap.appendChild(h);
      var grid = document.createElement("div");
      grid.className = "chapter-grid";
      byYear[year].forEach(function (ch) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "chapter-btn";
        b.innerHTML = "<strong>" + ch.question_count + "</strong><span>" +
          escapeHtml(ch.board) + " Board</span>";
        b.setAttribute("aria-label", paperTitle(ch) + ", " + ch.question_count + " questions");
        b.addEventListener("click", function (e) { e.stopPropagation(); startPaperTest(ch); });
        grid.appendChild(b);
      });
      wrap.appendChild(grid);
    });
  }

  function startPaperTest(ch) {
    subject = "board";
    bank = boardBank;
    var pool = ch.questions.map(function (q) { return prepQuestion(q, paperTitle(ch)); });
    startTest(paperTitle(ch), pool, "paper", ch.number, pool.length * 60, true);
  }

  function renderChapterGrid() {
    var grid = $("chapter-grid");
    grid.innerHTML = "";
    bank.chapters.forEach(function (ch) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chapter-btn";
      b.innerHTML = "<strong>" + ch.number + "</strong><span>" + escapeHtml(ch.title) + "</span>";
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        var pool = ch.questions.map(function (q) { return prepQuestion(q, chapterTitle(ch)); });
        startTest(chapterTitle(ch) + " Test", pool, true, ch.number);
      });
      grid.appendChild(b);
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Boolean overlines are drawn with CSS, not combining macron characters:
  // some fonts and devices drop or render the combining mark invisibly, so a
  // barred letter reads as a plain letter and changes the question's meaning
  // (this is how hsc32-q201's final B-bar vanished on a student's screen).
  function overlineize(html) {
    // Build units first: precomposed barred letters (Ā, ā) become barred
    // letter units, and a combining macron bars the unit before it. When
    // that unit is a closing bracket, the whole bracketed group is barred,
    // so (AB)\u0304 and (A+B)\u0304 get one full-width bar like the printed
    // book instead of a stub over the bracket alone. Letter bars and a
    // plain group bar share level 1 (in print they sit at the same height
    // and merge). A group that contains an already barred GROUP takes the
    // next level up (.ovl-hi, drawn higher), so nested complements such as
    // ((ABC)\u0304 + (ABC)\u0304)\u0304 keep their inner and outer bars distinct.
    var units = [];
    for (var i = 0; i < html.length; i++) {
      var ch = html.charAt(i);
      if (ch === "Ā") { units.push({ t: "A", lv: [1], g: 0 }); continue; }
      if (ch === "ā") { units.push({ t: "a", lv: [1], g: 0 }); continue; }
      if (ch === "\u0304" || ch === "\u0305") {
        var u = units[units.length - 1];
        if (u) {
          if (u.t === ")") {
            var depth = 0, j = -1, k2;
            for (k2 = units.length - 1; k2 >= 0; k2--) {
              if (units[k2].t === ")") depth++;
              else if (units[k2].t === "(") { depth--; if (depth === 0) { j = k2; break; } }
            }
            if (j < 0) { if (u.lv.indexOf(1) === -1) u.lv.push(1); }
            else {
              var gm = 0;
              for (k2 = j; k2 < units.length; k2++) if (units[k2].g > gm) gm = units[k2].g;
              var L = gm + 1;
              for (k2 = j; k2 < units.length; k2++) {
                if (units[k2].lv.indexOf(L) === -1) units[k2].lv.push(L);
                if (units[k2].g < L) units[k2].g = L;
              }
            }
          } else if (u.lv.indexOf(1) === -1) {
            u.lv.push(1);
          }
        }
        continue;
      }
      units.push({ t: ch, lv: [], g: 0 });
    }
    // Render with a span stack: higher levels nest outside lower ones.
    var out = "", stack = [];
    function sameSet(a, b) {
      return a.length === b.length && a.every(function (x) { return b.indexOf(x) !== -1; });
    }
    units.forEach(function (un) {
      var want = un.lv.slice().sort(function (a, b) { return b - a; });
      if (!sameSet(want, stack)) {
        var keep = 0;
        while (keep < stack.length && keep < want.length && stack[keep] === want[keep]) keep++;
        for (var c = stack.length - 1; c >= keep; c--) out += "</span>";
        for (var o = keep; o < want.length; o++) out += '<span class="ovl' + (want[o] > 1 ? " ovl-hi" : "") + '">';
        stack = want;
      }
      out += un.t;
    });
    for (var c2 = stack.length - 1; c2 >= 0; c2--) out += "</span>";
    return out;
  }

  function fmtText(s) { return overlineize(escapeHtml(s)); }

  function sample(pool) {
    return shuffle(pool.slice()).slice(0, Math.min(TEST_LEN, pool.length));
  }

  function startTest(title, pool, kind, refNo, secs, full) {
    stopTimer();
    var nSecs = secs || TEST_SECS;
    state = {
      title: title,
      kind: kind === "paper" ? "paper" : (kind ? "chapter" : "whole"),
      chapterwise: kind === "paper" ? false : !!kind,
      chapterNo: refNo || null,
      questions: full ? shuffle(pool.slice()) : sample(pool),
      picked: [],
      secs: nSecs,
      started: false,
      deadline: null,
      timerId: null,
      submitted: false,
      warned: false,
      auto: false
    };
    for (var i = 0; i < state.questions.length; i++) state.picked.push(null);
    renderTest();
    show("view-test");
    // The test and its timer start only after the student reads the
    // warning popup and clicks "I understand" (beginTest).
    setWarnOpen(true);
  }

  function blockScrollEvent(e) { e.preventDefault(); }
  function blockScrollKeys(e) {
    if (e.target && e.target.id === "start-warn-ok") return;
    if ([" ", "PageUp", "PageDown", "ArrowUp", "ArrowDown", "Home", "End"].indexOf(e.key) !== -1) {
      e.preventDefault();
    }
  }

  function setWarnOpen(open) {
    $("start-warn-modal").classList.toggle("open", open);
    document.documentElement.classList.toggle("warn-open", open);
    document.body.classList.toggle("warn-open", open);
    if (open) {
      window.addEventListener("wheel", blockScrollEvent, { passive: false });
      window.addEventListener("touchmove", blockScrollEvent, { passive: false });
      window.addEventListener("keydown", blockScrollKeys, false);
    } else {
      window.removeEventListener("wheel", blockScrollEvent);
      window.removeEventListener("touchmove", blockScrollEvent);
      window.removeEventListener("keydown", blockScrollKeys, false);
    }
  }

  function beginTest() {
    setWarnOpen(false);
    if (!state || state.submitted || state.started) return;
    state.started = true;
    state.deadline = Date.now() + state.secs * 1000;
    tick();
    state.timerId = setInterval(tick, 250);
  }

  function stopTimer() {
    if (state && state.timerId) { clearInterval(state.timerId); state.timerId = null; }
  }

  function remainingSecs() {
    if (!state.deadline) return state.secs;
    return Math.max(0, Math.round((state.deadline - Date.now()) / 1000));
  }

  function fmt(s) {
    var m = Math.floor(s / 60), sec = s % 60;
    return (m < 10 ? "0" + m : "" + m) + ":" + (sec < 10 ? "0" + sec : "" + sec);
  }

  function tick() {
    if (!state || state.submitted || !state.started) return;
    var s = remainingSecs();
    var el = $("exam-timer");
    el.textContent = fmt(s);
    el.classList.toggle("danger", s <= 120);
    if (s <= 0) {
      state.auto = true;
      submit();
    }
  }

  function answeredCount() {
    var n = 0;
    state.picked.forEach(function (p) { if (p !== null) n++; });
    return n;
  }

  function renderTest() {
    closeEndModal();
    $("exam-title").textContent = state.title;
    $("exam-progress").textContent = "Answered 0/" + state.questions.length;
    $("exam-timer").textContent = fmt(state.secs);
    $("exam-timer").classList.remove("danger");
    $("exam-warn").hidden = true;
    state.warned = false;

    var qnav = $("qnav");
    qnav.innerHTML = "";
    state.questions.forEach(function (q, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.className = "qdot";
      d.id = "qdot-" + i;
      d.textContent = (i + 1);
      d.setAttribute("aria-label", "Go to question " + (i + 1));
      d.addEventListener("click", function () {
        var card = $("qcard-" + i);
        if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      qnav.appendChild(d);
    });

    var box = $("questions");
    box.innerHTML = "";
    state.questions.forEach(function (q, i) {
      var card = document.createElement("div");
      card.className = "qcard";
      card.id = "qcard-" + i;
      var html = "";
      if (q.passage) {
        html += '<div class="qpassage"><span class="qpassage-label">উদ্দীপক</span>' +
          fmtText(q.passage) + "</div>";
      }
      html += '<p class="qstem"><span class="qnum">Q' + (i + 1) + ".</span> " + fmtText(q.question) + "</p>";
      if (q.figure) {
        html += '<div class="qfig"><img src="' + escapeHtml(q.figure) + '" alt="Circuit diagram for question ' + (i + 1) + '" loading="lazy"></div>';
      }
      html += '<div class="qopts" role="radiogroup" aria-label="Question ' + (i + 1) + ' options">';
      q.options.forEach(function (opt, oi) {
        var oid = "q" + i + "o" + oi;
        html += '<label class="qopt" for="' + oid + '">' +
          '<input type="radio" name="q' + i + '" id="' + oid + '" value="' + oi + '">' +
          '<span class="qletter">' + LETTERS[oi] + "</span>" +
          '<span class="qtext">' + fmtText(opt) + "</span></label>";
      });
      html += "</div>";
      card.innerHTML = html;
      box.appendChild(card);
      card.querySelectorAll('input[type="radio"]').forEach(function (radio) {
        radio.addEventListener("change", function () {
          state.picked[i] = parseInt(radio.value, 10);
          state.warned = false;
          $("exam-warn").hidden = true;
          // One chance only: lock this question so the answer cannot be changed.
          card.classList.add("locked");
          card.querySelectorAll('input[type="radio"]').forEach(function (r) { r.disabled = true; });
          updateProgress();
        });
      });
    });
    updateProgress();
  }

  function updateProgress() {
    var n = answeredCount();
    $("exam-progress").textContent = "Answered " + n + "/" + state.questions.length;
    state.questions.forEach(function (q, i) {
      var d = $("qdot-" + i);
      if (d) d.classList.toggle("done", state.picked[i] !== null);
    });
  }

  function submit() {
    if (!state || state.submitted) return;
    var unanswered = state.questions.length - answeredCount();
    if (unanswered > 0 && !state.warned && !state.auto) {
      state.warned = true;
      var w = $("exam-warn");
      w.textContent = "You have " + unanswered + " unanswered question" + (unanswered === 1 ? "" : "s") +
        ". Click Submit again to finish anyway.";
      w.hidden = false;
      w.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }
    state.submitted = true;
    closeEndModal();
    stopTimer();
    renderResult();
    show("view-result");
  }

  function renderResult() {
    var total = state.questions.length;
    var correct = 0;
    var wrong = [];
    state.questions.forEach(function (q, i) {
      if (state.picked[i] === q.answer) { correct++; }
      else {
        wrong.push({
          n: i + 1,
          question: q.question,
          passage: q.passage,
          yourIdx: state.picked[i],
          yourText: state.picked[i] === null ? null : q.options[state.picked[i]],
          correctText: q.options[q.answer],
          explanation: q.explanation
        });
      }
    });
    var pct = Math.round((correct / total) * 100);
    var usedSecs = state.secs - remainingSecs();

    $("result-score").textContent = correct;
    document.querySelector(".result-total").textContent = "/" + total;
    $("result-meta").textContent = pct + "% correct · " + fmt(usedSecs) + " used" +
      (state.auto ? " · time ran out, answers submitted automatically" : "");

    var verdict;
    if (pct >= 80) verdict = "Excellent. You have this down.";
    else if (pct >= 60) verdict = "Good work. Read the explanations below to close the gaps.";
    else if (pct >= 40) verdict = "A solid start. Go through the wrong answers, then try again.";
    else verdict = "Every expert was once a beginner. Study the explanations and retake the test.";
    $("result-verdict").textContent = verdict;

    var shareText = "I scored " + correct + "/" + total + " (" + pct + "%) in the " + state.title +
      " on Sakib Sir's practice page. Try it yourself: https://lecturer-pathan.vercel.app/practice.html";
    $("result-share").href = "https://wa.me/?text=" + encodeURIComponent(shareText);

    var wrap = $("result-review-wrap");
    var review = $("result-review");
    review.innerHTML = "";
    if (wrong.length === 0) {
      wrap.hidden = true;
    } else {
      wrap.hidden = false;
      $("review-title").textContent = "Review your wrong answers (" + wrong.length + ")";
      wrong.forEach(function (w) {
        var div = document.createElement("div");
        div.className = "review-item";
        var yourLine = w.yourText === null
          ? '<p class="review-your">Your answer: <span class="na">Not answered</span></p>'
          : '<p class="review-your">Your answer: <span>' + fmtText(w.yourText) + "</span></p>";
        div.innerHTML =
          (w.passage ? '<div class="qpassage"><span class="qpassage-label">উদ্দীপক</span>' +
            fmtText(w.passage) + "</div>" : "") +
          '<p class="review-q"><span class="qnum">Q' + w.n + ".</span> " + fmtText(w.question) + "</p>" +
          yourLine +
          '<p class="review-correct">Correct answer: <span>' + fmtText(w.correctText) + "</span></p>" +
          '<div class="review-why"><strong>Why:</strong> ' + fmtText(w.explanation) + "</div>";
        review.appendChild(div);
      });
    }

    $("result-retake").onclick = function () {
      // Rebuild a fresh test of the same kind.
      if (state.kind === "paper") {
        var pc = bank.chapters.filter(function (c) { return c.number === state.chapterNo; })[0];
        startPaperTest(pc);
      } else if (state.kind === "chapter") {
        var ch = bank.chapters.filter(function (c) { return c.number === state.chapterNo; })[0];
        var pool = ch.questions.map(function (q) { return prepQuestion(q, chapterTitle(ch)); });
        startTest(chapterTitle(ch) + " Test", pool, true, ch.number);
      } else {
        var all = [];
        bank.chapters.forEach(function (ch) {
          ch.questions.forEach(function (q) { all.push(prepQuestion(q, chapterTitle(ch))); });
        });
        startTest("Whole Book Test", all, false, null);
      }
    };
    $("result-choose").onclick = function () {
      if (state.kind === "paper") { showSetup("hsc"); openPaperPicker(); }
      else { show("view-setup"); }
    };
  }

  function refreshToTop() {
    var btn = $("to-top");
    if (!btn) return;
    var showIt = false;
    if (!$("view-result").hidden) {
      // Show only once the result card has scrolled out of the screen.
      showIt = $("result-card").getBoundingClientRect().bottom <= 0;
    }
    btn.classList.toggle("show", showIt);
  }

  function openEndModal() {
    if (!state || state.submitted) return;
    $("end-modal").classList.add("open");
  }

  function closeEndModal() {
    var m = $("end-modal");
    if (m) m.classList.remove("open");
  }

  function endTest() {
    if (!state) return;
    setWarnOpen(false);
    closeEndModal();
    stopTimer();
    var origin = state.kind === "paper" ? "hsc" : subject;
    state = null;
    subject = origin;
    bank = banks[origin] || null;
    show("view-setup");
  }

  document.addEventListener("DOMContentLoaded", function () {
    $("start-hsc").addEventListener("click", function (e) {
      e.preventDefault();
      showSetup("hsc");
    });
    $("start-olevel").addEventListener("click", function (e) {
      e.preventDefault();
      showSetup("olevel");
    });
    function pickBoardPapers() {
      if (!$("paper-picker").hidden) { collapsePickers(); return; }
      openPaperPicker();
    }
    $("type-boardpapers").addEventListener("click", pickBoardPapers);
    $("type-boardpapers").addEventListener("keydown", function (e) {
      if (e.target !== $("type-boardpapers")) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pickBoardPapers(); }
    });
    $("setup-back").addEventListener("click", function (e) {
      e.preventDefault();
      collapsePickers();
      show("view-landing");
    });

    function pickChapterwise() {
      if (!$("chapter-picker").hidden) { collapsePickers(); return; }
      loadBank(function () { openChapterPicker(); });
    }
    function pickWholeBook() {
      loadBank(function () {
        var all = [];
        bank.chapters.forEach(function (ch) {
          ch.questions.forEach(function (q) { all.push(prepQuestion(q, chapterTitle(ch))); });
        });
        startTest("Whole Book Test", all, false, null);
      });
    }
    $("type-chapterwise").addEventListener("click", pickChapterwise);
    $("type-wholebook").addEventListener("click", pickWholeBook);
    [$("type-chapterwise"), $("type-wholebook")].forEach(function (el, idx) {
      el.addEventListener("keydown", function (e) {
        if (e.target !== el) return;
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); (idx === 0 ? pickChapterwise : pickWholeBook)(); }
      });
    });

    // Clicks inside a picker must not toggle the card behind it.
    $("chapter-picker").addEventListener("click", function (e) { e.stopPropagation(); });
    $("paper-picker").addEventListener("click", function (e) { e.stopPropagation(); });

    $("exam-submit").addEventListener("click", function () { submit(); });
    $("exam-submit-bottom").addEventListener("click", function () { submit(); });
    $("start-warn-ok").addEventListener("click", beginTest);
    $("to-top").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", refreshToTop, { passive: true });
    $("exam-end").addEventListener("click", openEndModal);
    $("exam-end-bottom").addEventListener("click", openEndModal);
    $("end-modal-cancel").addEventListener("click", closeEndModal);
    $("end-modal-confirm").addEventListener("click", endTest);
    $("end-modal").addEventListener("click", function (e) {
      if (e.target === $("end-modal")) closeEndModal();
    });

    // Test hook only: ?debug=1 exposes state for automated checks.
    if (window.location.search.indexOf("debug=1") !== -1) {
      window.__practice = {
        getState: function () { return state; },
        forceTimeout: function () { if (state && state.started) { state.deadline = Date.now() - 1; tick(); } },
        submit: submit
      };
    }
  });
})();
