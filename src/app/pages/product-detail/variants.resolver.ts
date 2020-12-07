import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {iif, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {ProductsService} from '@app/services';

@Injectable({
  providedIn: 'root'
})
export class VariantsResolver implements Resolve<any> {
  productVariants$: Observable<any>;
  productVariants2$: Observable<any>;

  constructor(protected service: ProductsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.paramMap.get('slug');

    this.productVariants$ = this.service.fetchProduct(slug).pipe(
      map(response => response.body),
      map(variants => ({
        variants: {
          parent: {
            attributes: variants.attributes,
            href: variants.href
          },
          child: {
            attributes: variants.variants.map(v => v.attributes),
            href: variants.variants.map(t => t.href)
          }
        }
      }))
    );

    this.productVariants2$ = this.service.fetchProduct(slug).pipe(
      map(r => r.body),
      switchMap(m => this.service.fetchProductByHref(m.parent)),
      map(j => j),
      map(variants => ({
        variants: {
          parent: {
            attributes: variants.attributes,
            href: variants.href
          },
          child: {
            attributes: variants.variants.map(v => v.attributes),
            href: variants.variants.map(t => t.href)
          }
        }
      }))
    );

    return this.service.fetchProduct(slug).pipe(
      map(resp => resp.body),
      map(result => ({attributes: result.attributes, parent: result.parent, variants: result.variants})),
      switchMap(res => iif(() => res.parent === null, this.productVariants$, this.productVariants2$)),
    );
  }

}
