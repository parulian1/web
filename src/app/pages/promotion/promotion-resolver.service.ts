import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {PagedResponse} from "@app/core/pagination";
import {ProductPromotion} from "@app/models/product-promotion";
import {ProductPromotionService} from "@app/services/product-promotion.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class PromotionResolverService implements Resolve<ProductPromotion> {
  constructor(protected service: ProductPromotionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductPromotion> {
    const slug = route.paramMap.get('slug');
    return this.service.fetch(slug).pipe(
      map(resp => resp)
    )
  }
}
