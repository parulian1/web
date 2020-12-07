import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {Store} from "@app/models/store";
import {StoreService} from "@app/services";

/**
 * Resolves a list of all stores (warehouses) that a user can shop from,
 * in a non-paginated array.
 */
@Injectable({
  providedIn: 'root',
})
export class AllStoresResolver implements Resolve<Store[]> {
  constructor(private service: StoreService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Store[]> {
    return this.service.getAll();
  }
}
