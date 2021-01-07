import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from "rxjs/operators";

import { CredentialsService } from '@app/core/authentication';
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { ResellerCatalog, ResellerCatalogItem } from "@app/models";
import { PagedResponse } from "@app/core/pagination";

@Injectable({
  providedIn: 'root'
})
export class ResellerCatalogService {
  apiBaseUrl = '/order/reseller-saved-catalog';

  constructor(private credsService: CredentialsService, private http: HttpClient) { }

  fetchCatalogItems(query?: string, isActive?: boolean, page: number = 1): Observable<PagedResponse<ResellerCatalogItem>> {
      let params = new HttpParams().set('page', page.toFixed(0).toString());
      if (query) {
        params = params.set('q', query);
      }
    return this.http
      .get<ResellerCatalogItem[]>(`/order/reseller-catalog-item/`, {observe: 'response', responseType: 'json', params})
      .pipe(map(resp => new PagedResponse(resp)));
  }

  fetchCatalog(): Observable<ResellerCatalog> | Observable<never> {
    if (this.credsService.isAuthenticated()) {
      return this.http
        .get<ResellerCatalog>(`/order/reseller-catalog/`, {observe: 'body', responseType: 'json'});
    }
    return throwError(new Error('You must login, first.'));
  }

  addToCatalog(payload: { product: string, quantity: number, warehouse: string, price: number }): Observable<HttpResponse<any>> {
    return this.http
      .post(`/order/reseller-catalog-item/`,{
        product: payload.product,
        quantity: payload.quantity,
        warehouse: payload.warehouse,
        price: payload.price
      }, {observe: 'response'});
  }

  updateCatalog(id: string, quantity: number, price: number): Observable<HttpResponse<any>> {
    return this.http
      .put(`/order/reseller-catalog-item/${id}/`, {
        quantity,
        price
      }, {observe: 'response'});
  }

  removeCartItem(id: string): Observable<HttpResponse<any>> {
    return this.http
      .delete(`/order/reseller-catalog-item/${id}/`, {observe: 'response'});
  }
}
