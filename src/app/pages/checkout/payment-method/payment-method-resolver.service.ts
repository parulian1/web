import {Injectable} from '@angular/core';
import {PaymentMethod} from '@app/models/payment-method';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PaymentMethodService} from '@app/services/payment-method.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodResolverService implements Resolve<PaymentMethod[]> {

  constructor(private service: PaymentMethodService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaymentMethod[]> {
    return this.service.fetchList();
  }
}
