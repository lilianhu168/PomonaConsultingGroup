const SHEET_NAME = "Student Interest";

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const fields = [
    "Timestamp",
    "First name",
    "Last name",
    "Email",
    "Interested in",
    "Notes"
  ];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(fields);
  }

  const values = fields.map((field) => {
    if (field === "Timestamp") return new Date();
    const value = e.parameters[field] || e.parameter[field] || "";
    return Array.isArray(value) ? value.join(", ") : value;
  });

  sheet.appendRow(values);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}
