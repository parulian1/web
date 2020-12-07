import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {VerifyEmail} from '@app/models/auth';
import {AuthUserService} from '@app/services';
import {CredentialsService} from '@app/core/authentication';

/**
 * Returns email verification status for the current customer
 */

@Injectable({
  providedIn: 'root',
})
export class EmailVerifyResolver implements Resolve<VerifyEmail> {

  constructor(protected service: AuthUserService,
              protected cred: CredentialsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VerifyEmail> {
    const email = this.cred.email;
    return this.service.checkEmailVerification(email).pipe(
      map(response => response.body)
    );
  }

}
