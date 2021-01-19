import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppState } from '@app/store/state/app.state';

import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Store } from '@ngrx/store';
import { AuthFacebook, AuthGoogle } from '@app/store/actions/auth.actions';

import { Logger } from "@app/core";
import { AuthUserService } from "@app/services";
import { AuthenticationService } from "@app/core/authentication";
import {AuthSocialService} from '@app/services/auth-social.service';


const logger = new Logger('social-button.coponents.ts');


@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.scss']
})
export class SocialButtonComponent implements OnInit {
  @Input()
  public currentMode: string;
  public fbOn = false;
  public googleOn = false;

  constructor(
    // private store: Store<AppState>,
    private socialAuthService: SocialAuthService,
    private authUserService: AuthUserService,
    private authService: AuthenticationService,
    private router: Router,
    private authSocialService: AuthSocialService
  ) {}

  ngOnInit(): void {
    this.authSocialService.fetchList().subscribe(res => {
      res.map( xres => {
        if (xres.authType === 'google-oauth2') {
          this.googleOn = true;
        }
        if (xres.authType === 'facebook') {
          this.fbOn = true;
        }

      })
    })
  }

  authFb() {
    // this.store.dispatch(new AuthFacebook()); # error happens to auth-effect
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      return this.authUserService.socialConnectFb(user.authToken).toPromise().then(value => {
        this.authService.login({
          access: value.access,
          email: user.email,
          refresh: value.refresh,
        });
        this.router.navigateByUrl('/');
      });
    }).catch(err => this._handleError(err));
  }

  authGoogle() {
    // this.store.dispatch(new AuthGoogle()); # error happens to auth-effect
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      return this.authUserService.socialConnectGoogle(user.authToken).toPromise().then(value => {
        this.authService.login({
          access: value.access,
          email: user.email,
          refresh: value.refresh,
        });
        this.router.navigateByUrl('/');
      });
    }).catch(err => this._handleError(err));
  }

  _handleError(err: any): void {
    logger.debug(); // error happens if user close popup social account (login)
  }
}
