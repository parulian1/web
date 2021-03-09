import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Logger} from '../logger.service';
import {CredentialsService} from './credentials.service';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/store/state/app.state';
import {Logout} from 'src/app/store/actions';
import {AuthUserService} from '../../services/auth-user.service';
import { AuthenticationService } from "@app/core/authentication/authentication.service";

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
              private credentialsService: CredentialsService,
              private authService: AuthenticationService,
              private authUserService: AuthUserService,
              private store: Store<AppState>
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // check whether the user should refresh their credentials

    if (this.credentialsService.isAuthenticated()) {
      if (this.credentialsService.isTokenExpired) {
        if (this.credentialsService.canRefreshToken) {
          // this.store.dispatch(new RefreshToken(this.credentialsService.refreshToken));
          this.authUserService.refreshToken(this.credentialsService.refreshToken).subscribe(resp => resp);
          return true
        }
        // TODO: Force user to login page for now
        this.authService.logout();
        this.router.navigate(['/login'], {queryParams: {redirect: state.url}, replaceUrl: true});
        return false
      }
      return true;
    }

    if (this.credentialsService.isRefreshTokenExpired) {
      this.authService.logout();
    }


    // todo: add next parameter
    this.router.navigate(['/login'], {queryParams: {redirect: state.url}, replaceUrl: true});
    return false;
  }

}
