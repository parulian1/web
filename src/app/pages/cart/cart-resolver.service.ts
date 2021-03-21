import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Cart} from '@app/models/cart';
import {forkJoin, from, merge, Observable, of} from 'rxjs';
import {CartService} from '@app/services/cart.service';
import {concatMap, map, mergeMap, startWith, switchMap, take, toArray} from 'rxjs/operators';
import {EntityToSlugPipe} from '@app/shared/utils/entity-to-slug.pipe';
import {ProductsService} from '@app/services';
import {ProductDetail} from "@app/models/product-detail";

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<Cart> {
  cartObservables: Observable<Cart>;
  productObservables: Observable<any>;
  test$: Observable<any>;

  constructor(private service: CartService,
              private productsService: ProductsService,
              private pipe: EntityToSlugPipe) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cart> {
    this.cartObservables = this.service.fetchCart().pipe(
      map(res => res.body),
    );
    return this.cartObservables;

    // this.productObservables = this.service.fetchCart().pipe(
    //   map(res => res.body),
    //   map(line => line.cartItems.map(m => m.product)),
    //   switchMap(product => from(product).pipe(
    //     mergeMap((m) => {
    //       return this.productsService.fetchProduct(this.pipe.transform(m.href)).pipe(
    //         map(n => n.body),
    //         map(result => ({
    //           name: result.name,
    //           href: result.href,
    //           media: result.media.filter(media => media.type === 'image'),
    //           vendor: this.pipe.transform(result.vendor.href),
    //           priceLists: result.priceLists,
    //           weight: result
    //         }))
    //       )
    //     }
    //   ),
    //     toArray(),
    //   )),
    // );


    // return this.cartObservables.pipe(
    //   mergeMap(data => this.productObservables.pipe(
    //     map(data2 => [{cart: data, product: data2}])
    //   ))
    // );


    // return this.productObservables;
    // return this.cartObservables;
  }
}
