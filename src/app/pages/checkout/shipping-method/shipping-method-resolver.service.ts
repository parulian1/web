import {Injectable} from '@angular/core';
import {ShippingMethodService} from '@app/services/shipping-method.service';
import {ShippingMethod} from '@app/models/shipping-method';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShippingMethodResolverService implements Resolve<ShippingMethod[]> {

  constructor(private service: ShippingMethodService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShippingMethod[]> {
    return this.service.fetchList();
  }


}
