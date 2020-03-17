import {Injectable} from "@angular/core";
import {act, Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import {RegisterService} from "@app/services/register.service";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {
  AuthActionTypes,
  Register, RegisterFailed,
  RegisterSuccess
} from "@app/store/actions/auth.actions";
import {catchError, exhaustMap, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {createAction} from "@ngrx/store";
import {EmailActionTypes, VerifyEmail} from "@app/store/actions/email.actions";

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: RegisterService,
    private router: Router
  ) {
  }

  // register$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType('[Auth] Register User'),
  //     map((action: Register) => action.payload),
  //     switchMap(payload => {
  //       return this.authService.createAccount(payload.email, payload.password).pipe(
  //         map((user) => {
  //           return new RegisterSuccess({token: user.token, email: payload.email});
  //         })
  //       )
  //     })
  //   ));


  @Effect()
  Register: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTER),
    map((action: Register) => action.payload),
    switchMap(payload => {
      return this.authService.createAccount(payload.email, payload.password).pipe(
        map((user) => {
          return new RegisterSuccess({token: user.token, email: payload.email});
        }),
        catchError(error => of(new RegisterFailed({error})))
      )
    })
  );

  // @Effect()
  // VerifyEmail: Observable<any> = this.actions.pipe(
  //   ofType(EmailActionTypes.VERIFY_EMAIL),
  //   map((action: VerifyEmail) => action.payload),
  //   switchMap(payload => {
  //     return this.authService.sendVerifyEmail(payload.email, payload.token);
  //   })
  // );

  // register$ = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(AuthActionTypes.REGISTER),
  //     exhaustMap(action =>
  //     this.authService.createAccount(action.payload.email, action.payload.password).pipe(
  //       map(user => )
  //     ))
  //   ))

  @Effect({dispatch: false})
  RegisterSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTER_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('email', user.payload.email);

      // return new VerifyEmail({token: user.payload.token, email: user.payload.email});
      this.router.navigateByUrl('/home');
    }),
    // map(user => {
    //   return new VerifyEmail({token: user.payload.token, email: user.payload.email});
    // }),
  );
}
