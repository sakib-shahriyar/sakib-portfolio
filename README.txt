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
js/main.js — menu, animations, shared interactions
assets/previews/ — 4-page PDF previews (ch1 … ch6)
