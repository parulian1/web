import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {AuthUserService} from '@app/services';

@Injectable({
  providedIn: 'root',
})
export class AuthConfirmResolver implements Resolve<any> {

  constructor(protected service: AuthUserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const token = route.paramMap.get('token') || '';
    const uid = route.paramMap.get('uid') || '';
    return this.service.postEmailVerification(token, uid).pipe(
      map(m => m.body)
    );
  }
}
