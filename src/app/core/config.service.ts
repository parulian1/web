import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Configuration } from "@app/models/configuration";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Configuration = new Configuration();


  constructor(private http: HttpClient) {
  }

  processConfig() {
    return this.http.get<Configuration>('/client/site-config/', {
      observe: 'body',
      responseType: 'json'
    }).toPromise();
  }

  loadConfig(): Promise<Configuration> {
    this.processConfig().then(res => {
      Object.assign(this.config, res);
    });
    console.log('config called');
    return new Promise<Configuration>(resolve => {
      resolve(this.config);
    });
  }

}
