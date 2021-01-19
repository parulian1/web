import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PagedResponse} from '@app/core/pagination';
import {ProductPromotion} from '@app/models/product-promotion';
import {Observable} from 'rxjs';
import {ProductPromotionService} from '@app/services';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromotionListResolverService implements Resolve<PagedResponse<ProductPromotion>>{

  constructor(private service: ProductPromotionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedResponse<ProductPromotion>>  {
    const theQuery = route.queryParams;
    let params = new HttpParams();
    for (const keyParam of Object.keys(theQuery)) {
      if (['page', 'per_page'].indexOf(keyParam) >= 0) {
        if ('page' === keyParam || keyParam === 'per_page') {
          // need to validate number
          if (Number.isInteger(theQuery[keyParam])) {
            // TODO: probably need to throw error
            continue;
          }
        }

        params = params.set(keyParam, theQuery[keyParam]);
      }
    }
    return this.service.fetchParamList(params);
  }
}
