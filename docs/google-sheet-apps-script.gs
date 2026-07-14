/**
 * FleetGO Marketing Leads — Google Sheets logger
 *
 * SETUP
 * 1. Create a Google Sheet named "FleetGO Marketing Leads".
 * 2. Extensions → Apps Script. Delete any sample code and paste this file.
 * 3. Click Deploy → New deployment → type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Deploy, authorize, and copy the Web app URL.
 * 4. In Vercel → Settings → Environment Variables add:
 *      GSHEET_WEBHOOK_URL = <the Web app URL>
 *    then redeploy the site.
 *
 * Each website lead will now append a row automatically.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Leads') || ss.insertSheet('Leads');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Company', 'Fleet Size', 'Message']);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.fleetSize || '',
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
