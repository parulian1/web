import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Logger} from '@app/core';
import {OrderReviewService} from "@app/services/order-review.service";
import {OrderReview} from "@app/models/order/order-review";
import {PagedResponse} from "@app/core/pagination";

const log = new Logger('ListReviewResolver');

@Injectable({
  providedIn: 'root'
})
export class ListReviewResolver implements Resolve<any> {


  constructor(private service: OrderReviewService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResponse<OrderReview>> {
    const page = parseInt(route.queryParamMap.get('page') || '1', 10);
    const status = route.queryParamMap.get('status');
    return this.service.fetchOrderReview(page, status);
  }

}
