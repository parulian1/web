import {Injectable} from "@angular/core";
import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {EmailActionTypes, VerifySent} from "@app/store/actions/email.actions";
import {map, switchMap, tap} from "rxjs/operators";
import {
  VerifyEmail
} from "@app/store/actions/email.actions";
import {AuthUserService} from "@app/services/auth-user.service";
import {Router} from "@angular/router";
import {CredentialsService} from "@app/core/authentication/credentials.service";

@Injectable()
export class EmailEffects {

  constructor(private actions: Actions,
              private service: AuthUserService,
              private creds: CredentialsService,
              private router: Router) {
  }

  @Effect()
  VerifyEmail: Observable<any> = this.actions.pipe(
    ofType(EmailActionTypes.VERIFY_EMAIL),
    map((action: VerifyEmail) => action.payload),
    switchMap(payload => {
      return this.service.sendVerifyEmail(payload.email).pipe(
        map(res => {
          this.creds.setVerifyEmail(res);
          this.router.navigateByUrl('/home');

          // return new VerifySent({message: res});
        })
      )
    })
  )


}
