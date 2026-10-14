PERSONAL PORTFOLIO & ICT LEARNING PORTAL — Sakib Shahriyar Pathan
================================================================

A 5-page static website: Home, About, Notes (4-page PDF previews +
request-full-document flow), Lectures (YouTube video hub), Contact.
English only. Light/dark theme toggle included.

HOW TO EDIT (no coding needed)
------------------------------
1. js/site-config.js — your name, tagline, contact details, Facebook
   link, education, expertise chips and milestone timeline. Change the
   text between the quotes, save, re-upload.
2. js/site-config.js → DOCUMENTS — the 7 study-note documents: chapter
   headings, document titles and one-line descriptions.
3. js/videos.js — your YouTube lectures. Inside a chapter's [ ] list,
   add lines like:
       { id: "dQw4w9WgXcQ", title: "What is a Number System?" },
   The id is the 11-character code after "watch?v=" in the video URL.
   Empty chapters show a "coming soon" message automatically.
4. assets/previews/ — the 4-page preview PDFs shown in the Notes
   preview modal. To replace one, convert your document to PDF, keep
   only the first 4 pages, and save it over the matching file
   (ch1-preview.pdf … ch6-preview.pdf).
5. js/site-config.js → testimonials — real student quotes for the
   homepage "What students say" section. Add lines like:
       { name: "Student Name", detail: "HSC 2025, College",
         text: "Their exact words." },
   Leave the list empty and the section stays hidden.
6. js/site-config.js → DOCUMENTS → chapterBn — the Bengali chapter
   names shown under each English heading on the Notes page
   (and Lectures page).

WHAT'S NEW (student-attraction upgrades)
----------------------------------------
- Floating WhatsApp button (bottom-right, all 5 public pages).
  The number comes from js/site-config.js → whatsapp. It is injected
  by js/main.js, which admin.html does not load — so the dashboard
  has no button.
- Testimonials: homepage section, config-driven (see 5 above).
- Bengali chapter names on Notes/Lectures + Bengali keywords
  (এইচএসসি আইসিটি নোট, এইচএসসি আইসিটি ভিডিও লেকচার) in the
  <title> and meta descriptions of notes.html and lectures.html.
- Lectures page: "Notify me on WhatsApp" button under the chapter
  list — students tap it to ask for a message when videos drop.
- assets/favicon.svg ("SP" monogram) + Open Graph/Twitter share
  tags on all 5 pages (share image: your photo).

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

FREE HOSTING
------------
Option A — Netlify Drop: go to app.netlify.com/drop, drag this whole
folder in. Done — you get a free https link instantly.

Option B — GitHub Pages: create a free GitHub account, make a new
repository, upload these files, then Settings → Pages → Deploy from
branch (main). Your site appears at username.github.io/repo-name.

Then just share the link with your students. Re-upload files whenever
you edit something.

FILES
-----
index.html, about.html, notes.html, lectures.html, contact.html
css/style.css — theme, layout, light/dark modes
js/theme.js — theme toggle (remembers choice, respects OS setting)
js/site-config.js — all site text + document list
js/videos.js — YouTube lecture data
js/admin.js — dashboard logic
js/main.js — menu, animations, shared interactions
assets/photo.png — your circular photo (nav + hero)
assets/previews/ — 4-page PDF previews (ch1 … ch6)
admin.html — PRIVATE dashboard (not linked anywhere): open
  yoursite.com/admin.html, enter your passcode (set it in
  js/site-config.js → adminPasscode), add/remove YouTube lectures,
  then Download updated videos.js → replace js/videos.js →
  git add, commit, push. Note: the passcode is a casual lock only;
  a static site can't have real logins — only you can push to
  your GitHub repo, and that's the real protection.
