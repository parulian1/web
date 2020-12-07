import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Brand } from '@app/models/brand';
import { Observable } from 'rxjs';
import { Logger } from "@app/core";
const log = new Logger('BrandService');


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) {
  }

  getHomeBrand(isActive?: boolean): Observable<HttpResponse<Brand[]>> {
    let params = new HttpParams();
    if (isActive) {
      params = params.set("is_active", "true");
    }
    return this.http
      .cache(true)
      .get<Brand[]>(`/catalog/vendor/`, { observe: 'response', params });
  }

  getVendorBySLug(slug: string = ''): Observable<HttpResponse<Brand>> {
    return this.http
      .cache(true)
      .get<Brand>(`/catalog/vendor/${slug}/`, { observe: 'response' });
  }
}
