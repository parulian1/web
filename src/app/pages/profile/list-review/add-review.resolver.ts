import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, zip} from "rxjs";
import {OrderHistoryService, ProductsService, ReviewService} from "@app/services";
import {map} from "rxjs/operators";
import {EntityToSlugPipe} from "@app/shared/utils";

@Injectable({
  providedIn: 'root'
})
export class AddReviewResolver implements Resolve<any> {
  reviewStatus$: Observable<any>;
  order$: Observable<any>;
  product$: Observable<any>;

  constructor(private service: OrderHistoryService,
              private reviewService: ReviewService,
              private productService: ProductsService,
              private pipe: EntityToSlugPipe) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const parentOrderNumber = route.queryParamMap.get('parentOrderNumber');
    const orderHref = route.queryParamMap.get('orderHref');
    const product = route.queryParamMap.get('productSlug');
    const warehouse = route.queryParamMap.get('warehouse');

    this.product$ = this.service.fetch(parentOrderNumber).pipe(
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
    this.reviewStatus$ = this.reviewService.fetchReviewProductInOrder(product, orderHref);

    this.order$ = this.service.fetch(parentOrderNumber);

    return zip(this.order$, this.reviewStatus$, this.product$);
  }

}
