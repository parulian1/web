import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Configuration } from "@app/models/configuration";
import { tap } from "rxjs/operators";

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
    }).pipe(
      tap(result => this.config = Object.assign(this.config, result)),
    ).toPromise();
  }

  loadConfig(): Promise<Configuration> {
    return this.processConfig();
  }
}
