import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {EmailActionTypes} from '@app/store/actions/email.actions';
import {map, switchMap} from 'rxjs/operators';
import {
  VerifyEmail
} from '@app/store/actions/email.actions';
import {AuthUserService} from '@app/services/auth-user.service';
import {Router} from '@angular/router';
import {CredentialsService} from '@app/core/authentication/credentials.service';

@Injectable()
export class EmailEffects {

  @Effect()
  VerifyEmail: Observable<any> = this.actions.pipe(
    ofType(EmailActionTypes.VERIFY_EMAIL),
    map((action: VerifyEmail) => action.payload),
    switchMap(payload => {
      return this.service.sendVerifyEmail(payload.email).pipe(
        map(res => {
          this.creds.setVerifyEmail(res);
          this.router.navigateByUrl('/home');

        })
      );
    })
  );

  constructor(private actions: Actions,
              private service: AuthUserService,
              private creds: CredentialsService,
              private router: Router) {
  }


}
