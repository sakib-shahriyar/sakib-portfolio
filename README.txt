PERSONAL PORTFOLIO & ICT LEARNING PORTAL — "Dock" version
============================================================
Sakib Shahriyar Pathan · Lecturer in ICT

This is a SEPARATE, standalone version of the portfolio site,
styled on the "Dock" design system, with a light/dark theme toggle
(deep ink-blue dark palette; choice remembered, OS preference respected).
The main version lives in a different folder/zip; the two versions
do not share files. Edit and deploy this one independently.

DOCK DESIGN TOKENS USED
-----------------------
- Page background: #faf9f7 (canvas cream — never pure white)
- Text: #121722 (ink) · secondary text #777c86 (slate)
- Interactive color: #0068f9 (electric cobalt) — filled CTAs, links,
  active states only. Hover: #024bb1.
- Decorative only (never CTAs/links): #6736eb (vivid violet)
- Borders: 1px #efefef hairlines everywhere
- Buttons: 48px pill radius · Cards: 16px radius, 24px padding
- Typography: Inter (Google Fonts CDN) with system fallback;
  hero headline clamp(48px, 7vw, 84px), weight 600, line-height ~1.06
- Layout: max-width 1200px, 80px section gaps
- Hero: cream → soft blue gradient (#faf9f7 → #d5ecff → #f4f0ff)
- Final CTA banner: diagonal gradient bleeding blue from lower-right
- Footer: white with hairline top border, multi-column links

HOW TO EDIT (no coding needed)
------------------------------
1. js/site-config.js — name, tagline, contact details, Facebook link,
   education, expertise, milestones, adminPasscode. Change the text
   between the quotes, save, re-upload.
2. js/site-config.js → DOCUMENTS — the 7 study-note documents: chapter
   headings, Bengali chapter names (chapterBn), titles, descriptions.
3. js/site-config.js → testimonials — real student quotes for the
   homepage "What students say" 3-column grid:
       { name: "Student Name", detail: "HSC 2025",
         text: "Their exact words." },
   Leave the list empty and the section stays hidden.
4. js/videos.js — your YouTube lectures, one chapter list each:
       { id: "dQw4w9WgXcQ", title: "What is a Number System?" },
   Empty chapters show "coming soon" automatically. You can also use
   admin.html (below) instead of editing by hand.
5. assets/previews/ — the 4-page preview PDFs. To replace one, convert
   your document to PDF, keep only the first 4 pages, and save it over
   the matching file (ch1-preview.pdf … ch6-preview.pdf).

HOW IT WORKS
------------
- Notes page: each chapter card opens a preview modal with the 4-page
  PDF, then a locked section ("Preview Limited to 4 Pages").
- "Get Whole Document" takes the visitor to contact.html?doc=<id>,
  which shows a "Requesting: <title>" banner and pre-fills the form
  with: Hello, I would like to request the complete copy of the
  document: <Document Title>.
- Contact form opens the visitor's email app (mailto) — no backend,
  nothing stored online.
- Floating WhatsApp button (bottom-right) appears on the 5 public
  pages; the number comes from js/site-config.js → whatsapp.

PRIVATE DASHBOARD (admin.html)
------------------------------
Not linked anywhere in the navigation. Open yoursite.com/admin.html,
enter your passcode (js/site-config.js → adminPasscode), add/remove
YouTube lectures per chapter, then Download updated videos.js →
replace js/videos.js → git add, commit, push. The passcode is a
casual lock only — a static site cannot have real logins; only you
can push to your repository, and that is the real protection.

IMPORTANT — SHARE-LINK DOMAIN
------------------------------
The Open Graph/Twitter tags use a PLACEHOLDER canonical domain:
    https://sakib-portfolio-dock.vercel.app/
Update all og:url / og:image / twitter:image values in the 5 public
HTML files to your real deployed domain before sharing links
(otherwise link previews will point at the wrong address).

FREE HOSTING
------------
Option A — Netlify Drop: go to app.netlify.com/drop, drag this whole
folder in. Done — you get a free https link instantly.
Option B — Vercel: push this folder to its own repository and deploy.
Option C — GitHub Pages: new repository, upload these files, then
Settings → Pages → Deploy from branch (main).

FILES
-----
index.html, about.html, notes.html, lectures.html, contact.html
admin.html — private dashboard (not in nav)
css/style.css — Dock design tokens + all components (light only)
js/site-config.js — all site text, documents, testimonials, passcode
js/videos.js — YouTube lecture data
js/admin.js — dashboard logic
js/main.js — menu, reveals, config fill, WhatsApp button
assets/photo.png — circular photo (nav + hero)
assets/favicon.svg — site icon
assets/previews/ — 4-page PDF previews (ch1 … ch6)
