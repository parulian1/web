import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Category} from '@app/models/category';
import {Observable} from 'rxjs';
import {ProductsService} from '@app/services/products.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService implements Resolve<Category[]> {

  constructor(private service: ProductsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this.service.fetchCategoryLists().pipe(
      map(res => res.body)
    );
  }
}
