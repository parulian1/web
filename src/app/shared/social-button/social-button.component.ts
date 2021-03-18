import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AppState } from '@app/store/state/app.state';

import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Store } from '@ngrx/store';
import { AuthFacebook, AuthGoogle } from '@app/store/actions/auth.actions';

import { Logger } from "@app/core";
import { AuthUserService } from "@app/services";
import { AuthenticationService } from "@app/core/authentication";
import {AuthSocialService} from '@app/services/auth-social.service';
import { GtagService } from '@app/library/gtagjs/gtag.service';
import { WebAnalyticService } from '@app/services/web-analytic.service';


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
    private authSocialService: AuthSocialService,
    private gtag: GtagService,
    private webAnalyticService: WebAnalyticService,
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
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      if (!this.checkSocialProvideEmail(user)) { return; }

      return this.authUserService.socialConnectFb(user.authToken).toPromise().then(value => {
        this.authService.login({
          access: value.access,
          email: user.email,
          refresh: value.refresh,
        }).subscribe(() => {
          this.analyticAuth('Facebook');
          this.router.navigateByUrl('/');
        });
      });
    }).catch(err => this._handleError(err));
  }

  authGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      if (!this.checkSocialProvideEmail(user)) { return; }

      return this.authUserService.socialConnectGoogle(user.authToken).toPromise().then(value => {
        this.authService.login({
          access: value.access,
          email: user.email,
          refresh: value.refresh,
        }).subscribe(() => {
          this.analyticAuth('Google');
          this.router.navigateByUrl('/');
        });
      });
    }).catch(err => this._handleError(err));
  }

  /**
   * check if response from socialAuthService (signIn() method) provide email or not.
   * if not, give customer an inform that customer cannot login.
   */
  checkSocialProvideEmail(user: SocialUser): boolean {
    if (!user?.email) {
      alert('please provide email for your facebook account ' +
        'before `login with facebook` on this site.');
      return false;
    } else {
      return true;
    }
  }

  // analytic
  analyticAuth(method) {
    if (this.currentMode === 'Daftar') {
      this.gtag.signUp(method);
      this.webAnalyticService.signup(method.toLowerCase() as any);
    } else {
      this.gtag.login(method);
      this.webAnalyticService.login(method.toLowerCase() as any);
    }
  }

  _handleError(err: any): void {
    logger.debug(); // error happens if user close popup social account (login)
  }
}
