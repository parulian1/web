import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {RegisterService} from "@app/services/register.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {
  AuthActionTypes, ForgotPassword,
  Register, RegisterFailed,
  RegisterSuccess
} from "@app/store/actions/auth.actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {AuthenticationService} from "@app/services/auth/authentication.service";
import {Credentials} from "@app/models/credentials";

@Injectable()
export class AuthEffects {


  constructor(
    private actions: Actions,
    private registerService: RegisterService,
    private router: Router,
    private authService: AuthenticationService
  ) {
  }


  @Effect()
  Register: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTER),
    map((action: Register) => action.payload),
    switchMap(payload => {
      return this.registerService.createAccount(payload.email, payload.password).pipe(
        map((user) => {
          return new RegisterSuccess({token: user.token, email: payload.email});
        }),
        catchError(error => of(new RegisterFailed({error})))
      )
    })
  );

  @Effect({dispatch: false})
  RegisterSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTER_SUCCESS),
    tap((credentials: Credentials) => {
      this.authService.register(credentials);
      this.router.navigateByUrl('/home');
    }),
  );

  @Effect()
  ForgotPassword: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.FORGOT_PASSWORD),
    map((action: ForgotPassword) => action.payload),
    switchMap(payload => {
      return this.registerService.forgotPassword(payload);
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
    tap(() => {
      return this.registerService.socialConnectFb();
    })
  );

}
