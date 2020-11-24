import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { OrderHistoryService } from "@app/services";
import { PaymentMethodService } from "@app/services/payment-method.service";
import {map, tap, withLatestFrom} from "rxjs/operators";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class OrderConfirmChoicesResolver implements Resolve<any> {
  constructor(
    private orderHistoryService: OrderHistoryService,
    private paymentMethodService: PaymentMethodService,
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.orderHistoryService.fetchAll({ payment_type: 'manual_transfer' }).pipe(
      withLatestFrom(this.paymentMethodService.fetchList(true)),
      map(result => ({ orders: result[0], payments: result[1] })),
    )
  }
}
