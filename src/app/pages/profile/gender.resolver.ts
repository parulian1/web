import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {drf} from "@app/models";
import {ProfileService} from "@app/services";

@Injectable({
  providedIn: 'root',
})
export class GenderResolver implements Resolve<drf.Choice[]> {
  constructor(private service: ProfileService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<drf.Choice[]> {
    return this.service.getGenderOptions();
  }
}
