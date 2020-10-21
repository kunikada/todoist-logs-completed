enum RESPONSE_STATUS {
  SUCCESS = 'success',
  ERROR = 'error'
}

class MyResponse {
  status: RESPONSE_STATUS;
  message: string;

  constructor(status: RESPONSE_STATUS, message: string) {
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
