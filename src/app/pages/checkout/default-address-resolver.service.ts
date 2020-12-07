import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Addresses} from "@app/models/addresses";
import {Observable} from "rxjs";
import {CheckoutService} from "@app/services/checkout.service";

@Injectable({
  providedIn: 'root'
})
export class DefaultAddressResolverService implements Resolve<Addresses> {

  constructor(private service: CheckoutService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Addresses> {
    return this.service.fetchDefaultAddress();
  }
}
