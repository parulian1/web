import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {UserPayment} from "@app/models/customer/payment";
import {UserPaymentService} from "@app/services/user-payment.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {PagedResponse} from "@app/core/pagination";

@Injectable({
  providedIn: 'root',
})
export class PaymentResolver implements Resolve<PagedResponse<UserPayment>> {
  constructor(protected service: UserPaymentService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResponse<UserPayment>> {
    return this.service.fetchList().pipe(
      map(resp => resp)
    );
  }

}
