import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { CredentialsService } from '@app/core/authentication';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import { ResellerSavedCatalog } from "@app/models/reseller/reseller-saved-catalog";
import { AbstractCrudService } from "@app/core/http/abstract-crud-service";
import {getSlugFromHref} from "@app/shared/helpers";
import {PagedResponse} from "@app/core/pagination";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ResellerSavedCatalogService {
  baseUrl = '/order/reseller-saved-catalog/';

  constructor(protected httpClient: HttpClient, protected credsService: CredentialsService) {
  }

  fetchList(query?: string, page: number = 1): Observable<PagedResponse<ResellerSavedCatalog>> {
    // create query params --> ?q=maybe&page=1
    let params = new HttpParams().set('page', page.toFixed(0).toString());
    if (query) {
      params = params.set('q', query);
    }

    return this.httpClient
      .get<ResellerSavedCatalog[]>(`${this.baseUrl}`, {observe: 'response', responseType: 'json', params})
      .pipe(map(resp => new PagedResponse(resp)));
  }

  fetch(slug: string): Observable<ResellerSavedCatalog> | Observable<never> {
    if (this.credsService.isAuthenticated()) {
      return this.httpClient
        .get<ResellerSavedCatalog>(`${this.baseUrl}${slug}/`, {observe: 'body', responseType: 'json'});
    }
    return throwError(new Error('You must login, first.'));
  }

  createNewCatalogWithSelectedItem(payload: ResellerSavedCatalog): Observable<HttpResponse<any>> {
    if (payload.items.length > 0) {
      return this.httpClient
        .post(`${this.baseUrl}`, payload, {observe: 'response'});
    }
    console.log('Failed', payload);
  }

  update(entity: ResellerSavedCatalog): Observable<HttpResponse<ResellerSavedCatalog>> {
    return this.httpClient.put<ResellerSavedCatalog>(`${this.baseUrl}${getSlugFromHref(entity.href)}/`,
      JSON.parse(JSON.stringify(entity)),
      {
        responseType: 'json', observe: 'response'
      });
  }

}
