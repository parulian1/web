import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as CartActions from '@app/store/actions/cart.action';
import {map, mergeMap} from 'rxjs/operators';
import {CartService} from '@app/services/cart.service';

@Injectable()
export class CartEffects {

  GetCart$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.GetCart),
      mergeMap(action =>
        this.service.fetchCart().pipe(
          map((data) => {
            return CartActions.SuccessGetCart({payload: data.body});
          })
        )
      )
    )
  );

  constructor(private http: HttpClient,
              private actions$: Actions,
              private service: CartService) {
  }
}
