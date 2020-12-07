import {Injectable} from '@angular/core';
import {ProductLists} from '@app/models/product-lists';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {ProductsService} from '@app/services/products.service';
import {catchError, map, tap} from 'rxjs/operators';
import {ProductPagedResponse} from '@app/core/pagination/product-paged-response';
import {HttpParams} from '@angular/common/http';
import {Logger} from '@app/core';

const log = new Logger('HttpCacheService');

@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<ProductPagedResponse<ProductLists>> {
  paramsLength = 0;

  categoryParams = '';
  vendorParams = '';

  isNewCategory = false;
  isNewVendor = false;

  constructor(private service: ProductsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductPagedResponse<ProductLists>> {
    const theQuery = route.queryParams;
    let params = new HttpParams();


    for (const keyParam of Object.keys(theQuery)) {
      if (['q', 'ordering', 'category', 'vendor', 'highlight', 'page', 'per_page'].indexOf(keyParam) >= 0) {
        if ('page' === keyParam || keyParam === 'per_page') {
          // need to validate number
          if (Number.isInteger(theQuery[keyParam])) {
            // TODO: probably need to throw error
            continue;
          }

          if (this.isNewCategory || this.isNewVendor) {
            params = params.set('page', '1');
          }
        }

        if (keyParam === 'category') {
          if (this.categoryParams !== theQuery[keyParam]) {
            this.categoryParams = theQuery[keyParam];
            this.isNewCategory = true;
          } else {
            this.isNewCategory = false;
          }
        }

        if (keyParam === 'vendor') {
          if (this.vendorParams !== theQuery[keyParam]) {
            this.vendorParams = theQuery[keyParam];
            this.isNewVendor = true;
          } else {
            this.isNewVendor = false;
          }
        }


        params = params.set(keyParam, theQuery[keyParam]);
        continue;
      }
      const regx = /^price__(lte|gte|gt|lt)$/.exec(keyParam);
      if (!!regx) {
        params = params.set(keyParam, theQuery[keyParam]);
      }
    }



    return this.service.fetchProductLists(params).pipe(map(res => res), catchError(err => {
      if (err.status === 404) {
        // TODO: Maybe need handling wrong page parameter for pagination
        log.info('Receiving empty response');
        return of({} as ProductPagedResponse<ProductLists>);
      } else {
        // TODO: Need better error throw
        throwError(err);
      }
    }));
  }
}
