import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {HighlightList} from "@app/models/highlight";

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  cmsApiUrl = "/cms/highlight/";
  constructor(private http: HttpClient) { }

  fetchHighlightHomePage(isActive?: boolean): Observable<HttpResponse<HighlightList[]>> {
    let params = new HttpParams().set("is_show_homepage", "true");
    if (isActive) {
      params = params.set("is_active", "true");
    }
    return this.http.get<HighlightList[]>(this.cmsApiUrl, { observe: 'response', params });
  }

  fetchHighlightByVendor(vendorName?: string, isActive?: boolean): Observable<HttpResponse<HighlightList[]>> {
    let params = new HttpParams();
    if (vendorName) {
      params = params.set("vendor", vendorName);
    }
    if (isActive) {
      params = params.set("is_active", "true");
    }
    return this.http.get<HighlightList[]>(this.cmsApiUrl, { observe: 'response', params });
  }
}
