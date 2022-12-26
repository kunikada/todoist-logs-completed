class Todoist {
  static readonly TOKEN = PropertiesService.getScriptProperties().getProperty("TODOIST_API_TOKEN");
  labels: {[key: number]: string};
  projects: {[key: number]: string};

  read(): void {
    if (typeof this.labels !== "undefined" || typeof this.projects !== "undefined") {
      return;
    }

    const url = "https://api.todoist.com/sync/v9/sync"
      + "?sync_token=*"
      + '&resource_types=[%22labels%22,%22projects%22]';
    const options = {
      headers: {
        Authorization: `Bearer ${Todoist.TOKEN}`
      }
    };
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText("UTF-8"));

    this.labels = {};
    if (Array.isArray(data.labels)) {
      data.labels.forEach(label => this.labels[label.id] = label.name);
    }
    this.projects = {};
    if (Array.isArray(data.projects)) {
      data.projects.forEach(project => this.projects[project.id] = project.name);
    }
  }

  labelName(id: number): string {
    this.read();
    return this.labels[id];
  }

  labelNames(ids: number[]): string {
    const names: string[] = [];
    ids.forEach(id => names.push(this.labelName(id)));
    return names.join(",");
  }

  projectName(id: number): string {
    this.read()
    return this.projects[id];
  }
}
