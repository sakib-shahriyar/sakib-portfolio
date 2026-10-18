/* Practice tests: chapterwise and whole-book MCQ exams.
   25 questions, 20-minute timer, instant results with explanations. */
(function () {
  var SUBJECTS = {
    hsc:    { bankUrl: "assets/mcq/hsc-ict-mcq-bank.json",   title: "NCTB HSC ICT" },
    olevel: { bankUrl: "assets/mcq/olevel-cs-mcq-bank.json", title: "Cambridge O Level CS" }
  };
  var TEST_LEN = 25;
  var TEST_SECS = 20 * 60;
  var LETTERS = ["A", "B", "C", "D"];

  var banks = {};  // subject key -> bank JSON (cached)
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
      figure: q.figure || null
    };
  }

  function showSetup(key) {
    subject = key;
    bank = null;
    $("setup-title").textContent = SUBJECTS[key].title;
    $("chapter-picker").hidden = true;
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

  function renderChapterGrid() {
    var grid = $("chapter-grid");
    grid.innerHTML = "";
    bank.chapters.forEach(function (ch) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chapter-btn";
      b.innerHTML = "<strong>" + ch.number + "</strong><span>" + escapeHtml(ch.title) + "</span>";
      b.addEventListener("click", function () {
        var pool = ch.questions.map(function (q) { return prepQuestion(q, chapterTitle(ch)); });
        startTest(chapterTitle(ch) + " Test", pool, true, ch.number);
      });
      grid.appendChild(b);
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function sample(pool) {
    return shuffle(pool.slice()).slice(0, Math.min(TEST_LEN, pool.length));
  }

  function startTest(title, pool, chapterwise, chapterNo) {
    stopTimer();
    state = {
      title: title,
      chapterwise: !!chapterwise,
      chapterNo: chapterNo || null,
      questions: sample(pool),
      picked: [],
      deadline: Date.now() + TEST_SECS * 1000,
      timerId: null,
      submitted: false,
      warned: false,
      auto: false
    };
    for (var i = 0; i < state.questions.length; i++) state.picked.push(null);
    renderTest();
    show("view-test");
    tick();
    state.timerId = setInterval(tick, 250);
  }

  function stopTimer() {
    if (state && state.timerId) { clearInterval(state.timerId); state.timerId = null; }
  }

  function remainingSecs() {
    return Math.max(0, Math.round((state.deadline - Date.now()) / 1000));
  }

  function fmt(s) {
    var m = Math.floor(s / 60), sec = s % 60;
    return (m < 10 ? "0" + m : "" + m) + ":" + (sec < 10 ? "0" + sec : "" + sec);
  }

  function tick() {
    if (!state || state.submitted) return;
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
    $("exam-title").textContent = state.title;
    $("exam-progress").textContent = "Answered 0/" + state.questions.length;
    $("exam-timer").textContent = fmt(TEST_SECS);
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
      var html = '<p class="qstem"><span class="qnum">Q' + (i + 1) + ".</span> " + escapeHtml(q.question) + "</p>";
      if (q.figure) {
        html += '<div class="qfig"><img src="' + escapeHtml(q.figure) + '" alt="Circuit diagram for question ' + (i + 1) + '" loading="lazy"></div>';
      }
      html += '<div class="qopts" role="radiogroup" aria-label="Question ' + (i + 1) + ' options">';
      q.options.forEach(function (opt, oi) {
        var oid = "q" + i + "o" + oi;
        html += '<label class="qopt" for="' + oid + '">' +
          '<input type="radio" name="q' + i + '" id="' + oid + '" value="' + oi + '">' +
          '<span class="qletter">' + LETTERS[oi] + "</span>" +
          '<span class="qtext">' + escapeHtml(opt) + "</span></label>";
      });
      html += "</div>";
      card.innerHTML = html;
      box.appendChild(card);
      card.querySelectorAll('input[type="radio"]').forEach(function (radio) {
        radio.addEventListener("change", function () {
          state.picked[i] = parseInt(radio.value, 10);
          state.warned = false;
          $("exam-warn").hidden = true;
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
          yourIdx: state.picked[i],
          yourText: state.picked[i] === null ? null : q.options[state.picked[i]],
          correctText: q.options[q.answer],
          explanation: q.explanation
        });
      }
    });
    var pct = Math.round((correct / total) * 100);
    var usedSecs = TEST_SECS - remainingSecs();

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
          : '<p class="review-your">Your answer: <span>' + escapeHtml(w.yourText) + "</span></p>";
        div.innerHTML =
          '<p class="review-q"><span class="qnum">Q' + w.n + ".</span> " + escapeHtml(w.question) + "</p>" +
          yourLine +
          '<p class="review-correct">Correct answer: <span>' + escapeHtml(w.correctText) + "</span></p>" +
          '<div class="review-why"><strong>Why:</strong> ' + escapeHtml(w.explanation) + "</div>";
        review.appendChild(div);
      });
    }

    $("result-retake").onclick = function () {
      // Rebuild a fresh test of the same kind.
      if (state.chapterwise) {
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
    $("result-choose").onclick = function () { show("view-setup"); };
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
    $("setup-back").addEventListener("click", function (e) {
      e.preventDefault();
      $("chapter-picker").hidden = true;
      show("view-landing");
    });

    function pickChapterwise() {
      loadBank(function () { $("chapter-picker").hidden = false; });
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
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); (idx === 0 ? pickChapterwise : pickWholeBook)(); }
      });
    });

    $("exam-submit").addEventListener("click", function () { submit(); });
    $("exam-submit-bottom").addEventListener("click", function () { submit(); });

    // Test hook only: ?debug=1 exposes state for automated checks.
    if (window.location.search.indexOf("debug=1") !== -1) {
      window.__practice = {
        getState: function () { return state; },
        forceTimeout: function () { if (state) { state.deadline = Date.now() - 1; tick(); } },
        submit: submit
      };
    }
  });
})();
