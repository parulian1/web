import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CredentialsService} from '@app/core/authentication';
import {AbstractCrudService} from '@app/core/http/abstract-crud-service';
import {PagedResponse} from '@app/core/pagination';
import {order} from '@app/models';
import {Choice, ChoiceField, OptionsResponse} from "@app/models/drf";

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService extends AbstractCrudService<order.Order> {

  baseUrl = '/order/order';

  constructor(protected httpClient: HttpClient, protected credentialsService: CredentialsService) {
    super();
  }

  fetchListForCurrentUser(
    query?: string,
    page: number = 1,
    created?: string,
    created__gte?: string,
    created__lte?: string,
    status?: string,
    ordering?: string
  ): Observable<PagedResponse<order.Order>> {
    const rawParams = {
      'page': page.toFixed(0).toString(),
      'user': this.credentialsService.email,
      'created': created || '',
      'created__gte': created__gte || '',
      'created__lte': created__lte || '',
      'ordering': ordering || ''
    };
    if (query) {
      rawParams['q'] = query;
    }

    if (status) {
      rawParams['status'] = status;
    }

    return this.httpClient
      .get<order.Order[]>(
        `${this.baseUrl}/`,
        {
          observe: 'response',
          responseType: 'json',
          params: new HttpParams({fromObject: rawParams})
        }
      ).pipe(map(resp => new PagedResponse(resp)));
  }

  getFieldChoices(fieldName: string): Observable<Choice[]> {
    return this.httpClient
      .options<OptionsResponse>(`${this.baseUrl}/`, {observe: 'body', responseType: 'json'})
      .pipe(map(resp => (resp.actions.POST[fieldName] as ChoiceField).choices));
  }

  fetchAll(query: { user?: string, payment_type?: string, product?: string, per_page?: string, status?: string | string[] }): Observable<any> {
    let params = new HttpParams({fromObject: query});

    if (!query.per_page) {
      params = params.set('per_page', '250');
    }

    if (!query.user) {
      params = params.set('user', this.credentialsService.email);
    }

    return this.httpClient.get(`${this.baseUrl}`, { params });
  }

  createOrderPaymentConfirm(orderId: number, data: any): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}/${orderId}/payment-confirm/`, data);
  }
}
