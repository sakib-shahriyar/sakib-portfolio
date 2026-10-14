/* Theme toggle — runs early to avoid a flash of the wrong theme. */
(function () {
  var KEY = "spd-theme";
  function current() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function icon() {
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀" : "☾";
  }
  document.documentElement.setAttribute("data-theme", current());
  document.addEventListener("DOMContentLoaded", function () {
    icon();
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      icon();
    });
  });
})();
