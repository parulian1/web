import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AreaService} from '@app/services';
import {Area} from '@app/models/area';

@Injectable({
  providedIn: 'root'
})
export class ProvincesResolver implements Resolve<Area[]> {

  constructor(private service: AreaService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Area[]> {
    return this.service.fetchProvinces().pipe(
      map(res => res.body)
    );
  }

}
