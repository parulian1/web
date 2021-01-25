import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SocialAuth} from '@app/models/social-auth';
import {Customer} from '@app/models/customer';

import {AuthUserService} from '@app/services';
import {VerifyEmail} from '@app/models/auth';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {AuthenticationService} from "@app/core/authentication";
import {Logger} from "@app/core";

import { timer } from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertDialogComponent} from "@app/shared/alert-dialog";
import {AuthSocialService} from '@app/services/auth-social.service';


const log = new Logger('user-profile.component.ts');

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public socialAuth: Array<SocialAuth> = [];

  public currentModeFb = 'Sambungkan';
  public currentModeGoogle = 'Sambungkan';
  public srcGoogle = 'assets/social/logo-google.svg';

  disableVerify: boolean = false;
  verifyUser: VerifyEmail;

  public disabledFb = false;
  public disabledGoogle = false;
  public isCheckFb = false;
  public isCheckGoogle = false;

  public customer: Customer;

  public fbOn = false;
  public googleOn = false;

  constructor(
    private route: ActivatedRoute,
    private routers: Router,
    private authUserService: AuthUserService,
    private authService: AuthenticationService,
    private socialAuthService: SocialAuthService,
    private snackbar: MatSnackBar,
    private authSocialService: AuthSocialService
  ) {}

  ngOnInit(): void {
    this.getSocialLink();
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
    this.route.data.subscribe((data: { profile: Customer, verify: VerifyEmail }) => {
      this.customer = data.profile;
      this.verifyUser = data.verify;
    });

  }

  getSocialLink() {
    this.authUserService.getSocialLink().subscribe(res => {
      this.socialAuth = res;
      // google
      if ((this.socialAuth[0].isConnect) && (!this.socialAuth[0].canUnlink)) {
        this.currentModeGoogle = 'Putuskan Sambungan';
        this.srcGoogle = 'assets/social/logo-google-disabled.svg';
        this.disabledGoogle = true;
        this.isCheckGoogle = true;

      } else if ((this.socialAuth[0].isConnect) && (this.socialAuth[0].canUnlink)) {
        this.currentModeGoogle = 'Putuskan Sambungan';
        this.isCheckGoogle = true;
      }

      // facebook
      if ((this.socialAuth[1].isConnect) && (!this.socialAuth[1].canUnlink)) {
        this.currentModeFb = 'Putuskan Sambungan';
        this.disabledFb = true;
        this.isCheckFb = true;
      } else if ((this.socialAuth[1].isConnect) && (this.socialAuth[1].canUnlink)) {
        this.currentModeFb = 'Putuskan Sambungan';
        this.isCheckFb = true;
      }
    })}

  // social login
  connectWithGoogle(): void {
    if (this.isCheckGoogle && !this.disabledGoogle) {
      // disconnect
      this.authUserService.socialDisconnectGoogleProfile().subscribe(result => {
        this.reloadCurrentRoute();
      }, error => this._handleErrorFromSocialAuth(error));
    } else {
      // connect
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
        this.authUserService.socialConnectGoogleProfile(user.authToken).subscribe(value => {
          this.reloadCurrentRoute();
        }, error => this._handleErrorFromSocialAuth(error));
      });
    }
  }

  connectWithFacebook(): void {
    if (this.isCheckFb && !this.disabledFb) {
      // disconnect
      this.authUserService.socialDisconnectFbProfile().subscribe(result => {
        this.reloadCurrentRoute();
      }, error => this._handleErrorFromSocialAuth(error));
    } else {
      // connect
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
        this.authUserService.socialConnectFbProfile(user.authToken).subscribe(value => {
          this.reloadCurrentRoute();
        }, error => this._handleErrorFromSocialAuth(error));
      });
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.routers.url;
    this.routers.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.routers.navigate([currentUrl]);
    });
  }

  resendVerifyEmail(): void {
    if (!this.disableVerify) {
      // request and disabled verify button
      this.disableVerify = true;
      this.authUserService.verifyEmail().subscribe(() => {
        this.successVerify();
      }, () => this.disableVerify = false);
    }
  }

  _handleErrorFromSocialAuth(error) {
    if (error.status === 400) {
      // logout then show error message
      this.socialAuthService.signOut(true);
      alert(error.error.details[0].message);
    } else if (error.status === 409) {
      // this errors from fail to disconnect with social auth
      alert(error.error.message);
    } else {
      log.error('something happens: ', error);
    }
  }

  //
  successVerify(): void {
    // make timer, so that button doesnt click many time by user
    // wait until 4 minutes
    timer(3600 * 4).subscribe(() => this.disableVerify = false );

    this.snackbar.openFromComponent(AlertDialogComponent, {
      data: {
        message: 'Berhasil resend verifikasi email, silahkan periksa email anda',
        code: 200,
      },
      duration: 5 * 1000, // 5 seconds
      verticalPosition: "top",
      panelClass: ["mt-alert--is-primary", "mt-alert--has-text-centered"],
    });
  }
}
