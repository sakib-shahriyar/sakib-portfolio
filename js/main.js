/* Shared interactions: mobile menu, scroll reveals, hero highlight rotation. */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Mobile hamburger
    var burger = document.getElementById("hamburger");
    var links = document.getElementById("nav-links");
    if (burger && links) {
      burger.addEventListener("click", function () {
        links.classList.toggle("open");
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { links.classList.remove("open"); });
      });
    }

    // Scroll reveals
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    }

    // Rotating hero highlight words
    var dyn = document.getElementById("tagline-dynamic");
    if (dyn && typeof SITE !== "undefined" && SITE.heroHighlights && SITE.heroHighlights.length) {
      var i = 0;
      dyn.textContent = SITE.heroHighlights[0];
      setInterval(function () {
        dyn.style.opacity = "0";
        setTimeout(function () {
          i = (i + 1) % SITE.heroHighlights.length;
          dyn.textContent = SITE.heroHighlights[i];
          dyn.style.opacity = "1";
        }, 400);
      }, 3200);
    }

    // Footer year
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    // Fill config-driven content
    if (typeof SITE !== "undefined") {
      document.querySelectorAll("[data-site]").forEach(function (el) {
        var key = el.getAttribute("data-site");
        if (key === "email-link") {
          el.href = "mailto:" + SITE.email;
          el.textContent = SITE.email;
        } else if (key === "phone-link") {
          el.href = SITE.phoneLink;
          el.textContent = SITE.phone;
        } else if (key === "whatsapp-link") {
          el.href = SITE.whatsapp;
        } else if (SITE[key] !== undefined) {
          el.textContent = SITE[key];
        }
      });
    }
  });
})();
