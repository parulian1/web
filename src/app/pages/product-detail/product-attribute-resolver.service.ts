import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ProductAttributes } from '@app/models/product-detail';
import { ProductsService } from '@app/services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductAttributeResolverService implements Resolve<ProductAttributes[]> {

  constructor(private service: ProductsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductAttributes[]> {
    const slug = route.paramMap.get('slug');

    return this.service.fetchProduct(slug).pipe(
      map(r => r.body),
      switchMap(m => this.service.fetchProductByHref(m.productClass.href)),
      map(attr => attr),
      map(t => t.attributes.map(m => ( {href: m.href, type: m.type, name: m.name} ))),
    );
  }
}
