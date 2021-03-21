import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Cart } from '@app/models/cart';
import { Observable} from 'rxjs';
import { CartService } from '@app/services/cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<Cart> {
  cartObservables: Observable<Cart>;
  productObservables: Observable<any>;

  constructor(private service: CartService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cart> {
    return this.service.fetchCart().pipe(
      map(res => res.body),
    );
  }
}
