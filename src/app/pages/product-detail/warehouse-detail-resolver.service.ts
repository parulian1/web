import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {store} from '@app/models';
import {StoreService} from '@app/services';

@Injectable({
  providedIn: 'root'
})
export class WarehouseDetailResolverService implements Resolve<store.Store[]> {

  constructor(private service: StoreService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<store.Store[]> {
    return this.service.getAll();
  }
}
