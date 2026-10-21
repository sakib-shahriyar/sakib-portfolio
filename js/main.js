/* Shared interactions: mobile menu, scroll reveals, hero highlight rotation,
   active nav link, and floating WhatsApp button. */
(function () {
  // Discourage casual copying: block right-click and the usual
  // "inspect element" shortcuts on the public pages. This is a
  // deterrent only, not real protection: anyone determined can
  // still view the page source or open devtools another way.
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    if (e.key === "F12") { e.preventDefault(); return; }
    if (e.ctrlKey && e.shiftKey && (k === "i" || k === "j" || k === "c")) { e.preventDefault(); return; }
    if (e.ctrlKey && k === "u") { e.preventDefault(); }
  });

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
      wa.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';
      document.body.appendChild(wa);
    }
  });
})();
