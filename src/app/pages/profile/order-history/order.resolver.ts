import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {OrderHistoryService} from '@app/services';
import {Order} from '@app/models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderResolver implements Resolve<Order> {

  constructor(protected service: OrderHistoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order> {
    const slug = route.paramMap.get('orderNumber');
    return this.service.fetch(slug);
  }
}
