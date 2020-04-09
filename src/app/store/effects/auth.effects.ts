import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AuthUserService} from "@app/services/auth-user.service";
import {Router} from "@angular/router";
import {Observable, of, pipe} from "rxjs";
import {
  AuthActionTypes, ForgotPassword,
  Register, RegisterFailed,
  RegisterSuccess, Login, LoginSuccess, ChangePassword, ChangePasswordSuccess, AuthFacebook
} from "@app/store/actions/auth.actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {Credentials} from "@app/models/credentials";
import {AuthenticationService} from "@app/core/authentication/authentication.service";
import {VerifyEmail} from "@app/store/actions/email.actions";
import {logger} from "codelyzer/util/logger";
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from "angularx-social-login";
import {User} from "@app/models/user";
import {environment} from "@env/environment";

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authUserService: AuthUserService,
    private router: Router,
    private authService: AuthenticationService,
    private socialAuthService: AuthService,
  ) {
  }


  @Effect()
  Register: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTER),
    map((action: Register) => action.payload),
    switchMap(payload => {
      return this.authUserService.createAccount(payload.email, payload.password)
        .pipe(
          map(res => {
            return new RegisterSuccess({token: res.token, email: payload.email})
          })
        )
    })
  );

  @Effect()
  RegisterSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTER_SUCCESS),
    map((action: RegisterSuccess) => action.payload),
    map(payload => {
      this.authService.register(payload);
      return new VerifyEmail({email: payload.email})
    })
  );

  @Effect({dispatch: false})
  RegisterFailed: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTER_FAILED),
    map((action: RegisterFailed) => action.payload),
    map(payload => {
      console.log('Register Error', payload);
    })
  )

  @Effect()
  ChangePassword: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.CHANGE_PASSWORD),
    map((action: ChangePassword) => action.payload),
    switchMap(payload => {
      return this.authUserService.changePassword(payload.password, payload.password_confirm, payload.old_password)
        .pipe(
          map(res => {
            return new ChangePasswordSuccess(res);
          })
        )
    })
  );

  @Effect({dispatch: false})
  ChangePasswordSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.CHANGE_PASSWORD_SUCCESS),
    map((action: ChangePasswordSuccess) => action.payload),
    map(payload => {
      this.router.navigateByUrl('/profile');
    })
  )

  @Effect()
  Login: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: Login) => action.payload),
    switchMap(payload => {
      return this.authUserService.login(payload.email, payload.password).pipe(
        map(res => {
          return new LoginSuccess({token: res.token, email: payload.email});
        })
      )
    })
  );

  @Effect({dispatch: false})
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map((action: LoginSuccess) => action.payload),
    map(payload => {
      this.authService.login(payload);
      this.router.navigateByUrl('/home');
    })
  );


  @Effect()
  ForgotPassword: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.FORGOT_PASSWORD),
    map((action: ForgotPassword) => action.payload),
    switchMap(payload => {
      return this.authUserService.forgotPassword(payload);
    })
  );

  @Effect({dispatch: false})
  public Logout: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.authService.logout();
      this.router.navigateByUrl('/home');
    })
  );

  @Effect()
  AuthFacebook: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_FACEBOOK),
    pipe(
      map(res => {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
          return this.authUserService.socialConnectFb(user.authToken).toPromise().then(value => {
            this.authService.login({
              token: value.token,
              email: user.email
            });
            this.router.navigateByUrl('/home');
          })
        })
      })
    )
  )

  @Effect()
  AuthGoogle: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.AUTH_GOOGLE),
    pipe(
      map(res => {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
          return this.authUserService.socialConnectGoogle(user.authToken).toPromise().then(value => {
            this.authService.login({
              token: value.token,
              email: user.email
            });
            this.router.navigateByUrl('/home');
          })
        })
      })
    )
  )

}
