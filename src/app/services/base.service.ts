import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {LocalStorage} from "@app/services/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected _lastResponse: HttpResponse<any>;


  constructor(protected http: HttpClient,
              public localStorage: LocalStorage) { }

  protected buildHeaders(bodyMimeType?: string, version?: string): HttpHeaders {
    let h: HttpHeaders = new HttpHeaders();
    h = h.append("Accept", `application/vnd.gramedia.v3+json; ${(!!version) ? "version=" + version : ""}`);
    h = h.append("Accept-Language", this.localStorage.getItem("LANGUAGE") || "id");

    if (!!bodyMimeType) {
      h = h.append("Content-Type", "application/json");
    }
    return h;
  }

  protected async postJson<T>(url: string, body: any): Promise<T> {
    this._lastResponse = await this.http.post(
      url,
      JSON.stringify(body),
      {
        headers: this.buildHeaders("application/json"),
        observe: "response"
      }
    ).toPromise();

    return this._lastResponse.body as T;
  }
}
