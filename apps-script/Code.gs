/**
 * Spice Up Your UK: Private Shared Google Sheet Sync Backend (Google Apps Script)
 *
 * SETUP INSTRUCTIONS (5 minutes, zero server cost):
 * 1. Create a new Google Sheet in Google Drive and share it with your partner (Editor access).
 * 2. Open Extensions -> Apps Script, delete any default code, and paste this entire file.
 * 3. In Apps Script left sidebar -> Project Settings (gear icon) -> Script Properties:
 *    Add property `SYNC_PASSCODE` = `<choose-a-strong-shared-secret-passphrase>`
 *    (Optional: add `APP_PUBLIC_URL` = `https://<your-github-username>.github.io/<repo>/` for reminder emails)
 * 4. Click Deploy -> New deployment -> Select type: "Web app":
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (requests are authenticated via your private `SYNC_PASSCODE`!)
 * 5. Copy the Web App `https://script.google.com/macros/s/.../exec` URL into Phone A's Settings -> Sync,
 *    then show the QR code on Phone A for Phone B to scan!
 */

const TABLES = {
  profiles: 'Profiles',
  srsProgress: 'SRS_Progress',
  questionStats: 'Question_Stats',
  testSessions: 'Test_Sessions',
  dailyActivity: 'Daily_Activity',
  gameScores: 'Game_Scores',
  challenges: 'Challenges',
  customContent: 'Custom_Content',
};

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: 'spiceupuk-sync', version: 1 })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const body = JSON.parse(raw);

    const expectedPasscode =
      PropertiesService.getScriptProperties().getProperty('SYNC_PASSCODE') || '';
    if (!expectedPasscode || !constantTimeEquals(String(body.passcode || ''), expectedPasscode)) {
      return jsonResponse({ ok: false, error: 'Unauthorized: invalid sync passcode.' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ensureSheetsInitialized(ss);

    const nowIso = new Date().toISOString();
    const mutations = Array.isArray(body.mutations) ? body.mutations : [];

    // Also upsert active profile metadata if provided
    if (body.profile && body.profileId) {
      upsertRow(ss.getSheetByName(TABLES.profiles), String(body.profileId), body.profile.updatedAt || nowIso, body.profile);
    }

    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i];
      var sheetName = TABLES[m.table];
      if (!sheetName || !m.recordKey) continue;
      var sheet = ss.getSheetByName(sheetName);
      upsertRow(sheet, String(m.recordKey), String(m.updatedAt || nowIso), m.payload || {});
    }

    var since = body.since ? String(body.since) : null;
    var updates = collectUpdatesSince(ss, since);

    return jsonResponse({
      ok: true,
      serverTime: nowIso,
      updates: updates,
    });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: err && err.message ? err.message : String(err),
    });
  } finally {
    lock.releaseLock();
  }
}

function ensureSheetsInitialized(ss) {
  var keys = Object.keys(TABLES);
  for (var i = 0; i < keys.length; i++) {
    var tableKey = keys[i];
    var name = TABLES[tableKey];
    var sh = ss.getSheetByName(name);
    if (!sh) {
      sh = ss.insertSheet(name);
      if (tableKey === 'profiles') {
        sh.appendRow(['recordKey', 'updatedAt', 'payloadJson', 'reminderEmail']);
      } else {
        sh.appendRow(['recordKey', 'updatedAt', 'payloadJson']);
      }
      sh.setFrozenRows(1);
    }
  }
}

function upsertRow(sheet, recordKey, updatedAt, payloadObj) {
  var lastRow = sheet.getLastRow();
  var payloadStr = JSON.stringify(payloadObj);

  if (lastRow >= 2) {
    var data = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
    for (var r = 0; r < data.length; r++) {
      if (String(data[r][0]) === recordKey) {
        var existingUpdatedAt = String(data[r][1] || '');
        if (!existingUpdatedAt || updatedAt >= existingUpdatedAt) {
          sheet.getRange(r + 2, 2, 1, 2).setValues([[updatedAt, payloadStr]]);
        }
        return;
      }
    }
  }

  sheet.appendRow([recordKey, updatedAt, payloadStr]);
}

function collectUpdatesSince(ss, sinceIso) {
  var updates = [];
  var keys = Object.keys(TABLES);

  for (var i = 0; i < keys.length; i++) {
    var tableKey = keys[i];
    var sheet = ss.getSheetByName(TABLES[tableKey]);
    if (!sheet) continue;
    var lastRow = sheet.getLastRow();
    if (lastRow < 2) continue;

    var rows = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
    for (var r = 0; r < rows.length; r++) {
      var recordKey = String(rows[r][0] || '');
      var updatedAt = String(rows[r][1] || '');
      var payloadStr = String(rows[r][2] || '');
      if (!recordKey || !payloadStr) continue;

      if (!sinceIso || updatedAt >= sinceIso || tableKey === 'customContent') {
        try {
          updates.push({
            table: tableKey,
            recordKey: recordKey,
            updatedAt: updatedAt || new Date().toISOString(),
            payload: JSON.parse(payloadStr),
          });
        } catch (ignore) {}
      }
    }
  }
  return updates;
}

function constantTimeEquals(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * OPTIONAL DAILY COUPLE STREAK RESCUE TRIGGER:
 * In Apps Script -> Triggers (alarm clock icon), add a Time-driven Day timer (e.g. 8pm–9pm)
 * running `sendDailyStreakNudge`. Put each partner's email in Column D (`reminderEmail`) of the `Profiles` tab!
 */
function sendDailyStreakNudge() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheetsInitialized(ss);

  var tz = ss.getSpreadsheetTimeZone() || 'Europe/London';
  var today = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');

  var dailySheet = ss.getSheetByName(TABLES.dailyActivity);
  var studiedToday = {};
  if (dailySheet.getLastRow() >= 2) {
    var rows = dailySheet.getRange(2, 1, dailySheet.getLastRow() - 1, 3).getValues();
    for (var i = 0; i < rows.length; i++) {
      try {
        var rec = JSON.parse(String(rows[i][2]));
        if (rec.date === today && Number(rec.xp) > 0) {
          studiedToday[rec.profileId] = Number(rec.xp);
        }
      } catch (ignore) {}
    }
  }

  var profilesSheet = ss.getSheetByName(TABLES.profiles);
  if (profilesSheet.getLastRow() < 2) return;
  var pRows = profilesSheet.getRange(2, 1, profilesSheet.getLastRow() - 1, 4).getValues();
  var appUrl = PropertiesService.getScriptProperties().getProperty('APP_PUBLIC_URL') || '';

  for (var p = 0; p < pRows.length; p++) {
    var pid = String(pRows[p][0] || '');
    var email = String(pRows[p][3] || '').trim();
    if (!pid || !email || studiedToday[pid]) continue;

    var otherPid = pid === 'partner_a' ? 'partner_b' : 'partner_a';
    var partnerAlreadyStudied = Boolean(studiedToday[otherPid]);

    var subject = partnerAlreadyStudied
      ? "🌶️ Don't break the 2 Become 1 Streak: your partner already practiced today!"
      : '🌶️ Spice Up Your UK: Quick 5-minute study reminder!';

    var bodyText =
      (partnerAlreadyStudied
        ? 'Stop right now, thank you very much! Your partner has already logged XP today.\n\n'
        : 'Tell me what you want, what you really, really want... to pass the Life in the UK test!\n\n') +
      'Knock out 10 flashcards or a 60s Tube Blitz before midnight to keep your streak glowing.' +
      (appUrl ? '\n\nOpen Spice Up Your UK: ' + appUrl : '');

    MailApp.sendEmail(email, subject, bodyText);
  }
}
