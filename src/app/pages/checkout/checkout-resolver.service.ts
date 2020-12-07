import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Addresses} from '@app/models/addresses';
import {EMPTY, Observable, of} from 'rxjs';
import {CheckoutService} from '@app/services/checkout.service';
import {filter, find, map, mergeMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutResolverService implements Resolve<Addresses[]> {
  addr: Addresses;

  constructor(private service: CheckoutService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Addresses[]> {
    return this.service.fetchList().pipe(
      map(resp => resp)
    );
  }
}
