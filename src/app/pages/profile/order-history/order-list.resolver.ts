import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {OrderHistoryService} from '@app/services';
import {Order} from '@app/models/order';
import {PagedResponse} from '@app/core/pagination';
import {CredentialsService} from "@app/core/authentication";

/**
 * Returns the order history for the currently logged-in customer.
 */
@Injectable({
  providedIn: 'root',
})
export class OrderListResolver implements Resolve<PagedResponse<Order>> {

  constructor(protected service: OrderHistoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResponse<Order>> {
    const query = route.queryParamMap.get('search');
    const page = parseInt(route.queryParamMap.get('page') || '1', 10);
    const created = route.queryParamMap.get('created');
    const created__gte = route.queryParamMap.get('created__gte');
    const created__lte = route.queryParamMap.get('created__lte');
    const status = route.queryParamMap.get('status');
    const ordering = route.queryParamMap.get('ordering');
    return this.service.fetchListForCurrentUser(query, page, created, created__gte, created__lte, status, ordering);
  }
}
