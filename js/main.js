/* Shared interactions: mobile menu, scroll reveals, hero highlight rotation,
   active nav link, and floating WhatsApp button. */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Active nav link: marks whichever page the visitor is on.
    (function () {
      var links = document.getElementById("nav-links");
      if (!links) return;
      var page = window.location.pathname.split("/").pop() || "index.html";
      links.querySelectorAll("a[href]").forEach(function (a) {
        var href = a.getAttribute("href") || "";
        if (href.indexOf("#") === 0 || href.indexOf("http") === 0 || href.indexOf("mailto:") === 0) return;
        var target = href.split("/").pop().split("?")[0] || "index.html";
        a.classList.toggle("active", target.toLowerCase() === page.toLowerCase());
      });
    })();

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

    // Floating WhatsApp button (main.js loads on the 5 public pages;
    // admin.html does not load it, so the dashboard stays button-free)
    if (typeof SITE !== "undefined" && SITE.whatsapp && !document.querySelector(".wa-float")) {
      var wa = document.createElement("a");
      wa.className = "wa-float";
      wa.href = SITE.whatsapp;
      wa.target = "_blank";
      wa.rel = "noopener";
      wa.setAttribute("aria-label", "Chat on WhatsApp");
      wa.innerHTML = '<svg viewBox="0 0 448 512" aria-hidden="true" focusable="false"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-32.4 3.6-7.9 1.8-14.5-1-20.1-2.8-5.4-25-60.2-34.3-82.4-9-21.6-18.1-18.7-24.9-19-6.3-.6-13.5-.7-20.8-.7-7.2 0-19 2.8-28.9 14.1-10 11.2-38 37.1-38 90.5 0 53.4 38.8 105 44.2 112.2 5.4 7.1 76.2 116.3 184.6 163.1 25.8 11.1 45.9 17.7 61.6 22.6 25.9 8.4 49.4 7.2 68 4.4 20.7-8.2 60.6-24.8 69.1-48.7 8.4-24 8.4-44.6 5.9-48.9-2.5-4.3-9.1-7-18.6-11.9z"/></svg>';
      document.body.appendChild(wa);
    }
  });
})();
