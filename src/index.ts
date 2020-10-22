function doPost(e: GoogleAppsScript.Events.DoPost): GoogleAppsScript.Content.TextOutput {
  const data = JSON.parse(e.postData.contents);
  const response = new MyResponse(RESPONSE_STATUS.SUCCESS, "ok");

  try {
    const todoist = new Todoist();

    const row = {
      content: data.event_data.content,
      project: todoist.projectName(data.event_data.project_id),
      due: "",
      completed_at: Utilities.formatDate(new Date(data.event_data.date_completed), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss"),
      labels: "",
      priority: data.event_data.priority,
      url: data.event_data.url
    }
    if (data.event_data.due !== null) {
      row.due = data.event_data.due.date;
    }
    if (data.event_data.labels.length > 0) {
      row.labels = todoist.labelNames(data.event_data.labels);
    }

    const ss = new MySpreadsheet(PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID"));
    ss.unshiftRow(row);
  } catch(err) {
    console.error(err);
    console.log(data);

    response.status = RESPONSE_STATUS.ERROR;
    response.message = err.message;
  }

  return response.create();
}

