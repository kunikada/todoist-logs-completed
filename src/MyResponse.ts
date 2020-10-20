class MyResponse {
  status: string;
  message: string;

  constructor(status: string, message: string) {
    this.status = status;
    this.message = message;
  }

  toJSON(): {[key: string]: string} {
    return {
      status: this.status,
      message: this.message
    }
  }

  create(): GoogleAppsScript.Content.TextOutput {
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify(this));
    return output;
  }
}
