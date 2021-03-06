class MySpreadsheet {
  ss: GoogleAppsScript.Spreadsheet.Spreadsheet;
  sheet: GoogleAppsScript.Spreadsheet.Sheet;

  constructor(id: string, sheetId: number = 0) {
    if (id.match(/^https:\/\//)) {
      this.ss = SpreadsheetApp.openByUrl(id);
    } else {
      this.ss = SpreadsheetApp.openById(id);
    }
    this.sheet = this.ss.getSheets()[sheetId];
  }

  headers(): string[] {
    const range = this.sheet.getRange(1, 1, 1, this.sheet.getMaxColumns());
    return range.getValues()[0];
  }

  appendRow(row: {[key: string]: any}): void {
    const insertRow: any[] = [];
    this.headers().forEach((name, index) => {
      insertRow.push((name && name in row) ? row[name] : "");
    });
    this.ss.appendRow(insertRow);
  }

  unshiftRow(row: {[key: string]: any}): void {
    this.sheet.insertRowAfter(1);
    const range = this.sheet.getRange(2, 1, 1, this.sheet.getMaxColumns());
    this.headers().forEach((name, index) => {
      if (name) {
        range.getCell(1, index + 1).setValue(row[name]);
      }
    });
  }
}
