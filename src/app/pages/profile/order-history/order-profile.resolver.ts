import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {merge, Observable, zip} from 'rxjs';
import {OrderHistoryService, ReviewService} from '@app/services';
import {filter, map, mergeMap, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {EntityToSlugPipe} from "@app/shared/utils";

@Injectable({
  providedIn: 'root',
})
export class OrderProfileResolver implements Resolve<any> {
  reviewStatus$: Observable<any>;
  order$: Observable<any>;
  product$: Observable<any>;

  constructor(private service: OrderHistoryService,
              private reviewService: ReviewService,
              private pipe: EntityToSlugPipe) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.paramMap.get('orderNumber');
    const product = route.paramMap.get('productSlug');
    const warehouse = route.paramMap.get('warehouse');





    this.reviewStatus$ = this.service.fetch(slug).pipe(
      map(result => ({
        orderHref: result.href,
        productHref: result.children
          .filter(m => m.warehouse.slug === warehouse)[0].data
          .filter(t => t.lineItems
            .filter(v => this.pipe.transform(v.product.href) === product))[0].lineItems[0].product.href
      })),
      switchMap(rev => this.reviewService.checkReviewStatus(rev.orderHref, rev.productHref)),
      map(res => res.body));

    this.product$ = this.service.fetch(slug).pipe(
      map(result => ({
        productImage: result.children
          .filter(m => m.warehouse.slug === warehouse)[0].data
          .filter(t => t.lineItems
            .filter(v => this.pipe.transform(v.product.href) === product))[0].lineItems[0].product.image,
        productName: result.children
          .filter(m => m.warehouse.slug === warehouse)[0].data
          .filter(t => t.lineItems
            .filter(v => this.pipe.transform(v.product.href) === product))[0].lineItems[0].product.name,
        productHref: result.children
          .filter(m => m.warehouse.slug === warehouse)[0].data
          .filter(t => t.lineItems
            .filter(v => this.pipe.transform(v.product.href) === product))[0].lineItems[0].product.href
      }))
    );

    this.order$ = this.service.fetch(slug);

    return zip(this.order$, this.reviewStatus$, this.product$);
  }
}
