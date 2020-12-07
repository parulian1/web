import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {iif, Observable} from 'rxjs';
import {ProductDetail} from '@app/models/product-detail';
import {ProductsService} from '@app/services/products.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolverService implements Resolve<ProductDetail> {
  products$: Observable<ProductDetail>;

  constructor(private service: ProductsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductDetail> {
    const slug = route.paramMap.get('slug');

    this.products$ = this.service.fetchProduct(slug)
      .pipe(
        map(response => response.body)
      );


    return this.products$;
    // return this.service.fetchProduct(slug).pipe(
    //   map(resp => resp.body),
    //   map(parent => parent.parent),
    //   iif(() => m !== '', )
    // );
  }
}
