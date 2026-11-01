PERSONAL PORTFOLIO & ICT LEARNING PORTAL — "Dock" version
============================================================
Sakib Shahriyar Pathan · Lecturer in ICT
Live at: https://lecturer-pathan.vercel.app/

This is a SEPARATE, standalone version of the portfolio site,
styled on the "Dock" design system (cream paper, cobalt accents,
Inter). The original minimal version lives in a different folder
and is never merged into this one. Edit and deploy this one
independently.

WHAT THE SITE IS
----------------
7 public pages, plus a custom 404 page:
  index.html    — Home, hero, courses note, testimonials
  about.html    — Bio, career history, expertise, timeline
  courses.html  — Online HSC ICT batches (from js/courses.js)
  notes.html    — Study-note previews, HSC + O Level
  lectures.html — YouTube lecture hub, search, chapter filters
  practice.html — Timed MCQ tests, 4 question banks
  contact.html  — Contact form (mailto / WhatsApp), FAQ
  404.html      — Custom not-found page

Light/dark theme toggle (choice remembered, OS preference
respected). Floating WhatsApp button on the public pages.
Google Search Console is verified with an HTML file (see
FILES below). Vercel Analytics is on the public pages.

THE DOCUMENTS (Notes page)
---------------------------
7 HSC ICT documents, in js/site-config.js as DOCUMENTS:
  ch1   — Chapter 1: ICT: World & Bangladesh Perspective
  ch2   — Chapter 2: Communication Systems & Networking
  ch3p1 — Chapter 3 (Part 1): Number System
  ch3p2 — Chapter 3 (Part 2): Digital Devices
  ch4   — Chapter 4: Web Design & HTML
  ch5   — Chapter 5: Programming Language
  ch6   — Chapter 6: Database Management System

10 Cambridge O Level Computer Science documents, in
js/site-config.js as OLEVEL_DOCUMENTS, ids ol1 to ol10,
chapters 1 to 10 in book order.

Each document card shows a 4-page preview only, as flattened
image-only PDFs with a "sakib sir" watermark, in
assets/previews/ (ch1-preview.pdf … ch6-preview.pdf and
olevel-ch1-preview.pdf … olevel-ch10-preview.pdf). The full
document is never published on the site. "Get Whole Document"
goes to contact.html?doc=<id>, which shows a "Requesting"
banner and pre-fills the form. To replace a preview, convert
your document to PDF, keep only the first 4 pages, and save
it over the matching preview file.

THE PRACTICE BANKS (Practice page)
-----------------------------------
4 banks, all loaded as JSON from assets/mcq/:
  NCTB HSC ICT       — 1,816 questions, 7 chapter entries
                       (numbers 1, 2, 3, 3, 4, 5, 6; the two
                       Chapter 3 chapters are Part 1 Number
                       System and Part 2 Digital Devices)
  HSC ICT Notes Bank — 2,594 questions, built from the
                       detailed notes, with a symbol guide
  Cambridge O Level  — 2,000 questions, 200 per chapter x 10
  Board Papers       — 905 questions, 45 past papers
                       (2016, 2019, 2023, 2024, 2025, 2026)

Chapterwise and whole-book tests are 25 questions in 20
minutes. Board papers keep their real question count and use
48 seconds per question (20 minutes per 25 questions).
Answers lock after selection; see practice.html
for the current test rules. The practice engine shuffles
each question's options at runtime, so the order students
see is not the order in the bank file.

HOW TO EDIT (no coding needed)
------------------------------
1. js/site-config.js — name, tagline, contact details,
   Facebook link (leave empty if you do not want one),
   education, expertise, milestones, testimonials, and the
   two document lists above. Change the text between the
   quotes, save, re-upload. Do NOT add a passcode here:
   there is no admin passcode any more (see LOCAL ADMIN
   below). The file also holds notifySheetUrl, the Google
   Apps Script link for the Lectures "Notify me" form, and
   siteUrl, the live site address used for share links.
2. js/courses.js — your batches, one entry per batch in the
   COURSES list. Each entry has a name, schedule, mode and
   status (for example, "Admission open"). Fees are never
   published on the site; they are handled on WhatsApp.
   The Courses page and the homepage admission banner (Phase
   4) are built from this list, so keep it as the single
   source of truth for batches.
3. js/videos.js — your YouTube lectures, one chapter list
   each, in the VIDEOS object:
     { id: "dQw4w9WgXcQ", title: "What is a Number System?" }
   Empty chapters show "coming soon" automatically. You can
   also use the local admin tool (below) instead of editing
   by hand. Only add videos you have actually published on
   YouTube; do not invent video ids.

HOW IT WORKS
------------
- Notes page: each chapter card opens a preview modal with
  the 4-page PDF, then a locked section ("Preview Limited
  to 4 Pages"). Nothing beyond page 4 is on the site.
- Lectures page: search over titles and chapter names,
  chapter filter chips, "Recently added" newest videos,
  ?v=<youtube-id> deep links, WhatsApp share, and a
  "Notify me" box. Subscribing posts the student's name,
  batch, chapter and WhatsApp number to your Google Sheet
  (see apps-script-notify.gs) and then opens WhatsApp with
  the same details as a prefilled message, as a backup.
  The form validates Bangladeshi mobile numbers and a
  100-character name limit, and it has a hidden honeypot
  field: submissions with that field filled in are dropped
  entirely. A short privacy sentence under the form says
  the name and number are used only for new-video
  notifications on WhatsApp and can be removed on request.
- Contact form: opens the visitor's email app (mailto) or
  WhatsApp with the message prefilled. A static site has
  no backend of its own; the only server piece is the
  Google Sheet logger above. If the page was opened for a
  document (?doc=), the request is also posted to that
  sheet (Requests tab), best-effort, before the message
  opens; general messages are not stored. A privacy
  sentence under the form says so, in English and Bangla.
 - Practice page: answers lock after selection. Tab switches
  are counted, 3 switches auto-submit, and the timer
  auto-submits on expiry. The test blurs while the tab or
  window is not focused. A refresh resumes the same test on
  the same browser and device, with the same questions,
  locked answers, switch count and remaining time. Nothing
  is stored on a server.
- Homepage: an admission banner is built from COURSES in
  js/courses.js and hidden when no course has status
  "Admission open". "Join a Batch" is the single primary
  hero button; the other hero buttons are secondary.
- Bengali text uses self-hosted Hind Siliguri (Bengali
  subset only, woff2, font-display swap) after Inter in
  the font stack, and Bengali blocks carry lang="bn"
  (a helper in js/main.js marks them, including content
  rendered by JavaScript).
- Floating WhatsApp button (bottom-right) appears on the
  public pages; the number comes from js/site-config.js
  → whatsapp.
- Right-click and keyboard shortcuts ARE blocked again on
  the public pages (the Phase 3 removal was reverted at
  Sakib's direction). Text selection is still limited by
  CSS on the public pages. Both are casual deterrents
  only, not real protection.

CACHE-VERSION RULE (read this before every deploy)
--------------------------------------------------
Vercel caches by the rules in vercel.json, so a changed file
will NOT reach visitors unless its version changes:
- HTML pages: no-cache. An HTML change goes live on deploy
  with no version bump needed for the HTML file itself.
- JS, CSS, banks, fonts and photos: immutable, 1-year cache.
  You MUST bump the ?v= number when you change one of
  these files, or visitors will keep the old cached copy.
  Current numbers:
    js/site-config.js ?v=8  (all 8 HTML pages)
    js/main.js        ?v=5  (all 8 HTML pages)
    js/theme.js       inlined into all 8 HTML pages (head, no ?v=; edit js/theme.js, then re-inline)
    css/style.css     minified + inlined into all 8 HTML pages (no ?v=; edit css/style.css, then minify + re-inline)
    js/practice.min.js    ?v=1 (practice.html only; minified from js/practice.js)
    js/courses.js     ?v=2  (courses.html and index.html)
    js/videos.js      ?v=2  (lectures.html only)
  Question banks: there is only ONE number now, in
  js/practice.js at the top: BANK_VERSION = 50. Bump that
  single number whenever ANY bank file changes, and all
  four bank URLs change with it. Do not go back to
  per-bank numbers.
- Photos, fonts and guide images: versioned by filename,
  not by ?v= (for example, photo-nav-v2.webp and
  notes-symbol-guide-v2.png). Rename the file with a new
  suffix and update every reference to it.
- sitemap.xml: no-cache, must-revalidate. It is picked up
  fresh on every deploy.
- If a change does not appear after deploy, check the live
  served ?v= number first, before assuming the deploy
  failed. A stale copy on your own device is the most
  common cause; view the deployed URL, not a local file
  copy, because browsers block bank JSON over file://.

SHARED CSS AND THEME (inlined into every page)
-----------------------------------------
 - css/style.css is the shared CSS source for every public page,
  minified + inlined into each HTML page (not linked, no ?v=). It is the CSS
  that used to be linked as css/style.css?v=3. Edit css/style.css,
  then minify (clean-css) + re-inline it into all 8 pages, rewriting font URLs from
  ../assets/fonts/... to assets/fonts/... (pages are at root, the
  file sits in css/). Do not edit the inlined copies directly, or
  the pages will diverge (they are minified, one line).
- Page-specific CSS stays inline in its own page: courses
  (batch cards), contact (FAQ accordion), practice (exam
  UI, in its second <style> block), plus two small override
  blocks: index (grid-4 and testimonial avatar initials)
  and practice (hero-photo object-fit, kept for exactness).
- js/theme.js is the theme script, inlined into the head of
  every public page (not loaded via <script src>), so the
  saved theme is applied before the page paints and there
  is no flash of the wrong theme. Edit js/theme.js, then
  re-inline it into all 8 pages. It uses the same localStorage key as
  before, so saved preferences survive this change.
- The old external twins css/contact.css, css/courses.css
  and css/practice.css were deleted in Phase 3, because
  their content is now either in css/style.css or inline
  in the page, and the practice twin was out of date.
  Do not recreate them.

CHECKING THE QUESTION BANKS (tools/)
------------------------------------
From this site folder, run:
  python3 tools/validate_banks.py
It checks all four MCQ banks (7,315 questions in total
after Phase 2) for duplicate ids, answer index out of
range, duplicate options within a question, empty options,
missing explanations, and missing figure files. It prints
every problem it finds and exits with an error if there
is any, so run it before shipping a bank change. As of
Phase 3, it reports nothing: the four duplicate-option
board questions from Phase 2 were dropped with your
confirmation, and the validator now passes clean.
  python3 tools/check_answer_length.py
reports, per O Level chapter, how often the correct answer
is the longest option, and lists the worst offenders. It
only reads the bank; it never changes it. See
data-review-olevel.md for the first batch of proposed
rewrites from that report (applied in Phase 3, see below).

DATA REVIEW FILES (Phase 2, applied in Phase 3)
------------------------------------------------
- data-review-board.md — the four duplicate-option board
  questions, with figures checked. Applied: all four were
  dropped from the site bank and the by-year source files,
  with your confirmation. Board bank: 909 to 905 questions.
- data-review-olevel.md — O Level answer-length bias, worst
  10 per chapter in chapters 3 to 6 (40 questions). Applied:
  all 40 distractor rewrites, correct answers unchanged.
  The remaining strictly-longest questions in chapters 3 to
  6 are still to be done in further batches.
Both files are kept for reference, but they are NOT
deployed: see .vercelignore. Do not re-apply the proposals
in them; they are historical now.

LOCAL ADMIN TOOL (_local-admin/, outside the site folder)
--------------------------------------------------------
The dashboard is NOT part of the deployed site. It lives
in a separate _local-admin/ folder NEXT TO this site
folder, as it comes in the zip, so it is never pushed to
GitHub and never deployed to Vercel, and never appears
on the live site. Do not copy it back inside this site
folder. (The .vercelignore file here is only a safety
net, in case it is ever copied inside.)
There is no passcode, and you must not invent one: the
tool only runs on your own computer, and it cannot publish
anything by itself. Your real protection is that only you
can push to your repository.

How to use it:
1. Keep the _local-admin/ folder next to this site folder,
   exactly as it comes in the zip.
2. From the parent folder (the one containing both
   folders), start a local server, for example:
     python3 -m http.server 8000
   then open in your browser:
     http://localhost:8000/_local-admin/admin.html
   (Opening the file by double-clicking also works in
   most browsers, but the local server is the reliable
   way.)
3. Add/remove YouTube lectures per chapter, then click
   "Download updated videos.js".
4. Replace js/videos.js in this site folder with the
   downloaded file, bump videos.js ?v= if you changed it
   (see CACHE-VERSION RULE above), then git add, commit,
   push as usual.
The tool also has "Announce a new video on WhatsApp":
pick the video and it opens WhatsApp with the
announcement (title + link to the lectures page) already
written — send it to your broadcast list of subscribers
in one tap.
Do not upload the _local-admin/ folder anywhere, and do
not link to it from any public page.

GOOGLE SHEET LOGGER (Notify me)
--------------------------------
apps-script-notify.gs is the server script for the
Lectures "Notify me" form. Paste it into Apps Script
(Extensions → Apps Script in your "Notify Subscribers"
sheet), save, then Deploy → Manage deployments → New
version → Deploy. Editing the code alone does not change
the live web app until you publish a New version. The
web app URL is SITE.notifySheetUrl in js/site-config.js
and does not change on a New version. The full setup
steps are in notify-sheet-setup-guide.md (in your files,
not in the site folder). The script validates Bangladeshi
phone format and field lengths, ignores honeypot
submissions silently, stores the phone as plain text so
a leading + is not read as a formula, and appends to
Name | Batch | Chapter Interest | Phone | Date | Notes.

DEPLOY STEPS (Vercel)
---------------------
1. Make your edits (site-config.js, courses.js, videos.js,
   banks, CSS, or JS) and bump every ?v= number for every
   file you changed, following CACHE-VERSION RULE above.
   For a bank change, bump BANK_VERSION in practice.js (source)
  and practice.min.js ?v= as well, because practice.min.js itself
  changed (it is minified from practice.js).
2. Run the checks, from the site folder:
     python3 tools/validate_banks.py
   Fix any problem it reports before deploying.
3. Commit and push to GitHub:
     git add .
     git commit -m "Describe the change"
     git push
   Push ONLY the site folder's contents to the site
   repository. Do NOT push _local-admin/ (it lives next
   to the site folder, outside the repository).
4. Vercel redeploys automatically from the push. Wait for
   the deployment to finish, then check the LIVE URL,
   not a local file copy:
     https://lecturer-pathan.vercel.app/
   Check the served ?v= numbers on the pages you changed
   (view page source on the live site). If a page still
   shows an old ?v=, the deploy did not pick up your
   change; check the Vercel deployment log before
   re-pushing.
5. If Vercel shows no new deployment for your push, check
   the Git connection and the Production Branch setting
   in Vercel, then redeploy from the Vercel dashboard.

IMPORTANT — SHARE-LINK DOMAIN
------------------------------
The Open Graph/Twitter tags use the live domain:
    https://lecturer-pathan.vercel.app/
If you move the site to a different domain, update all
og:url / og:image / twitter:image values and the
canonical tags in the HTML files, and SITE.siteUrl in
js/site-config.js, or link previews and share links will
point at the wrong address.

FILES
-----
index.html, about.html, courses.html, notes.html,
lectures.html, practice.html, contact.html, 404.html
  — public pages (HTML is no-cache)
google8f982dce7b31a9f7.html
  — Google Search Console verification file, do not delete
css/style.css — shared CSS source, minified + inlined into all 8 pages (no ?v=; minify + re-inline after editing)
js/site-config.js — all site text, documents, testimonials,
  notifySheetUrl, siteUrl (?v=8)
js/videos.js — YouTube lecture data (?v=2)
js/courses.js — batch data, plus optional syllabus, classSize, recordingsIncluded, demoClass (shown only when filled in) (?v=2)
js/main.js — menu, reveals, config fill, WhatsApp button (?v=5)
js/theme.js — theme toggle source, inlined into the head of all 8 pages (no ?v=; re-inline after editing)
js/practice.js — practice test engine source, BANK_VERSION = 50 (loaded as js/practice.min.js?v=1)
assets/photo-*.webp — circular photos (nav + hero)
assets/favicon.svg — site icon
assets/fonts/inter-latin-v1.woff2 — self-hosted Inter font
assets/previews/ — 4-page PDF previews (7 HSC + 10 O Level)
assets/mcq/ — question banks (see THE PRACTICE BANKS above)
  hsc-ict-mcq-bank.json, hsc-board-papers.json,
  hsc-ict-new-mcq-bank.json, olevel-cs-mcq-bank.json
  figures/ — figure images referenced by bank questions
assets/notes-symbol-guide-*.png/.webp — Notes Bank symbol guide
robots.txt — allows all pages, points to the sitemap
sitemap.xml — all 7 public pages, no-cache
vercel.json — security headers and cache rules
apps-script-notify.gs — Apps Script logger (not deployed,
  see .vercelignore; paste it into Apps Script yourself)
tools/validate_banks.py, tools/check_answer_length.py
  — bank checks (not deployed, see .vercelignore)
data-review-board.md, data-review-olevel.md
  — Phase 2 review reports, applied in Phase 3 (not
  deployed, see .vercelignore)
README.txt — this file
.vercelignore — excludes _local-admin (safety net), tools/,
  data-review-*.md and apps-script-notify.gs from Vercel
  deployments. Note: this only affects Vercel, not GitHub;
  those files are still in the repository folder if you
  push the whole folder.

The _local-admin/ folder itself is NOT inside this site
folder. It is delivered next to it in the zip, with its
own README.txt inside it. See LOCAL ADMIN TOOL above.
