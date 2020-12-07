import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {StoreService} from "@app/services";

@Injectable({
  providedIn: 'root'
})
export class StockResolver implements Resolve<any> {

  constructor(private service: StoreService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.paramMap.get('slug');
    const fullHref = `/catalog/product/${slug}/`;

    return this.service.getAvailableStock(fullHref);
  }

}
