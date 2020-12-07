import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CredentialsService} from '@app/core/authentication';
import {AbstractCrudService} from '@app/core/http/abstract-crud-service';
import {PagedResponse} from '@app/core/pagination';
import {OrderReview} from "@app/models/order/order-review";

@Injectable({
  providedIn: 'root'
})
export class OrderReviewService extends AbstractCrudService<OrderReview> {

  baseUrl = '/order/order-review';

  constructor(protected httpClient: HttpClient, protected credentialsService: CredentialsService) {
    super();
  }

  fetchOrderReview(
    page: number = 1,
    status?: string
  ): Observable<PagedResponse<OrderReview>> {
    const rawParams = {
      'page': page.toFixed(0).toString(),
      'status': status || '',
    };

    if (status) {
      rawParams['status'] = status;
    }

    return this.httpClient
      .get<OrderReview[]>(
        `${this.baseUrl}/`,
        {
          observe: 'response',
          responseType: 'json',
          params: new HttpParams({fromObject: rawParams})
        }
      ).pipe(map(resp => new PagedResponse(resp)));
  }

}
