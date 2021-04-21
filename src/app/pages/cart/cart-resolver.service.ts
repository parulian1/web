import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CartResponse } from '@app/models/cart';
import { Observable} from 'rxjs';
import { CartService } from '@app/services/cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<CartResponse> {

  constructor(private service: CartService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CartResponse> {
    return this.service.fetchCart().pipe(
      map(response => {
        return {
          headers: response.headers,
          body: response.body
        } as CartResponse;
      })
    );
  }
}
