// ============================================================================
// Notify Subscribers: receiver for the Lectures page "Notify me" form.
//
// HOW TO USE THIS FILE (you do this once, in Apps Script):
//   1. Open your "Notify Subscribers" Google Sheet.
//   2. Extensions -> Apps Script. Delete everything in the editor.
//   3. Paste this whole file in, then click Save.
//   4. Deploy -> Manage deployments -> pencil icon -> Version:
//      "New version" -> Deploy. (Editing the code alone does NOT
//      change the live web app until you publish a New version.)
//   5. The web app URL ends in /exec. That URL is already in the
//      site as SITE.notifySheetUrl in js/site-config.js; it does
//      not change when you publish a New version.
//
// WHAT IT DOES:
//   - Receives one subscription at a time from lectures.html.
//   - Receives one document request at a time from contact.html
//     (Phase 4.4, type "document-request"), and writes it to a
//     second tab named "Requests" (created with headers if it
//     does not exist yet), in the header order:
//       Timestamp | Doc ID | Doc Title | Name | Contact
//   - Ignores honeypot submissions silently (see below).
//   - Drops repeat submissions silently: the same phone +
//     chapter, or the same contact + document, within 24 hours
//     is not appended again (see Abuse controls).
//   - Accepts at most 200 rows a day in total (see Abuse
//     controls); further submissions that day are dropped
//     silently, while the website's WhatsApp backup still
//     reaches you.
//   - Validates the same rules as the website form, then appends
//     one subscriber row to the sheet's first tab, in the header
//     order: Name | Batch | Chapter Interest | Phone | Date | Notes
//   - The phone cell is set to plain text first, so a number
//     starting with + is stored as text, not read as a formula.
//   - Posts are routed by the "type" field: missing or "notify"
//     means a subscription, "document-request" means a document
//     request, anything else is ignored, so it cannot pollute
//     either list.
//
// WHAT IT DOES NOT DO (on purpose):
//   - It never sends WhatsApp messages itself. The website opens
//     WhatsApp with a prefilled message as a backup, so even if
//     this save fails, the student's message still reaches you.
//   - It contains no password, secret or sheet ID. Anyone who
//     opens the web app URL can POST to it, which is why the
//     validation and honeypot checks below matter: junk rows
//     that fail validation are never appended. Delete any junk
//     row that still gets through by hand.
// ============================================================================

// Bangladeshi mobile: +8801XXXXXXXXX or 01XXXXXXXXX, where the
// digit after 1 is 3-9. Spaces and dashes are ignored before testing.
function isBdPhone(raw) {
  var cleaned = String(raw || "").replace(/[\s\-]/g, "");
  return /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/.test(cleaned);
}

// Trim, strip line breaks and tabs (so one field can never break
// the row layout), and cap the length. Returns a plain string.
function cleanField(value, maxLen) {
  var s = String(value || "").replace(/[\r\n\t]+/g, " ").trim();
  return s.slice(0, maxLen);
}

function doPost(e) {
  var data = {};

  // The website sends JSON (fetch, Content-Type: text/plain).
  // Fall back to form parameters for direct form posts and tests.
  try {
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
  } catch (err) {
    data = {};
  }
  if (!data || typeof data !== "object") data = {};
  var params = (e.parameter) || {};
  function pick(key) {
    return data[key] !== undefined && data[key] !== null
      ? data[key]
      : (params[key] !== undefined ? params[key] : "");
  }

  // ---- Honeypot: ignore silently ----
  // The website form has a hidden "website" field that a real
  // person never sees or fills in. Bots often fill every field.
  // If it has any value, return success WITHOUT appending, so
  // the bot gets no signal that it was detected.
  var honeypot = String(pick("website") || pick("honeypot") || "").trim();
  if (honeypot) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // ---- Type routing ----
  // Missing type (the Lectures form sends none) or "notify" means
  // a subscription, handled below. "document-request" is handled
  // in its own branch next. Anything else is ignored silently.
  var type = String(pick("type") || "").trim();
  if (type && type !== "notify" && type !== "document-request") {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // ---- Document request (Phase 4.4) ----
  if (type === "document-request") {
    var docId = cleanField(pick("docId"), 50);
    var docTitle = cleanField(pick("docTitle"), 200);
    var reqName = cleanField(pick("name"), 100);
    var contact = cleanField(pick("contact") || pick("whatsappOrEmail") || pick("email"), 100);
    var tsRaw = cleanField(pick("timestamp"), 50);
    if (!docId || !docTitle || !reqName || !contact) {
      return errorOut("Document request needs a document, a name and a contact.");
    }
    var ts = new Date(tsRaw);
    if (isNaN(ts.getTime())) ts = new Date();
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var reqSheet = ss.getSheetByName("Requests");
    if (!reqSheet) {
      reqSheet = ss.insertSheet("Requests");
      reqSheet.getRange(1, 1, 1, 5).setValues([["Timestamp", "Doc ID", "Doc Title", "Name", "Contact"]]);
    }
    if (isDuplicate(reqSheet, 1, [5, 2], [contact, docId], 24)) return okOut();
    if (overDailyCap()) return okOut();
    var reqRow = reqSheet.getLastRow() + 1;
    reqSheet.getRange(reqRow, 1, 1, 5).setValues([[ts, docId, docTitle, reqName, contact]]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // ---- Validate, matching the website form ----
  var name = cleanField(pick("name"), 100);
  var batch = cleanField(pick("batch"), 50);
  var chapter = cleanField(pick("chapter"), 100);
  var phoneRaw = String(pick("phone") || "").trim();
  var phone = phoneRaw.replace(/[\s\-]/g, "");

  if (!name) {
    return errorOut("Name is required.");
  }
  if (!batch) {
    return errorOut("Batch is required.");
  }
  if (!chapter) {
    return errorOut("Chapter is required.");
  }
  if (!isBdPhone(phoneRaw)) {
    return errorOut("Phone must be a Bangladeshi number: +8801XXXXXXXXX or 01XXXXXXXXX.");
  }

  // ---- Append one row ----
  // The sheet's first tab is used, in the same header order as
  // the setup guide: Name | Batch | Chapter Interest | Phone |
  // Date | Notes. The phone cell is formatted as text BEFORE
  // writing, so a leading + is not parsed as a formula.
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (isDuplicate(sheet, 5, [4, 3], [phone, chapter], 24)) return okOut();
  if (overDailyCap()) return okOut();
  var row = sheet.getLastRow() + 1;
  sheet.getRange(row, 4).setNumberFormat("@");
  sheet.getRange(row, 1, 1, 6).setValues([[
    name,
    batch,
    chapter,
    phone,
    new Date(),
    "Website"
  ]]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorOut(message) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: false, error: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

function okOut() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---- Abuse controls (v157) ----
// The web app URL is public by design, so anyone who reads the
// site's JavaScript can POST. Two controls keep junk out of the
// lists without blocking real students: a duplicate check (the
// same phone + chapter, or the same contact + document, within
// 24 hours is dropped) and a global daily cap of 200 accepted
// rows, counted in script properties. Both fail open: if the
// check itself errors, the submission is still appended, because
// losing a real student's message is worse than one more junk
// row. Drops return success silently, like the honeypot, so a
// spammer gets no signal that anything was detected. The day
// boundary follows the script's timezone; the exact midnight
// does not matter for a cap. These controls only take effect
// after this file is pasted and published as a New version
// (see HOW TO USE above), like every other change here.

// True if the sheet already holds a row matching all matchCols
// values (1-based column numbers) with a date in the last hours.
// Rows are appended in time order, so the scan stops at the first
// matching row older than the window. Only the last 500 rows are
// scanned, which is plenty for these lists.
function isDuplicate(sheet, dateCol, matchCols, matchVals, hours) {
  try {
    var last = sheet.getLastRow();
    if (last < 2) return false;
    var first = Math.max(2, last - 499);
    var values = sheet.getRange(first, 1, last - first + 1, sheet.getLastColumn()).getValues();
    var cutoff = new Date().getTime() - hours * 3600 * 1000;
    for (var i = values.length - 1; i >= 0; i--) {
      var row = values[i];
      var match = true;
      for (var c = 0; c < matchCols.length; c++) {
        if (String(row[matchCols[c] - 1] || "").trim() !== matchVals[c]) { match = false; break; }
      }
      if (!match) continue;
      var d = row[dateCol - 1];
      var t = (d instanceof Date) ? d.getTime() : new Date(d).getTime();
      if (!isNaN(t) && t >= cutoff) return true;
      if (!isNaN(t)) return false;
    }
  } catch (err) { return false; }
  return false;
}

// True once 200 rows have been accepted today. Counts attempts
// that passed validation, before the append, so a failed append
// may over-count by one; that is harmless for a cap.
function overDailyCap() {
  try {
    var props = PropertiesService.getScriptProperties();
    var today = new Date();
    var key = "accepted-" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var n = parseInt(props.getProperty(key) || "0", 10) || 0;
    if (n >= 200) return true;
    props.setProperty(key, String(n + 1));
    return false;
  } catch (err) { return false; }
}
