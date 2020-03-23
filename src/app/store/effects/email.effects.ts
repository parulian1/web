import {Injectable} from "@angular/core";
import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import {Observable} from "rxjs";
import {EmailActionTypes} from "@app/store/actions/email.actions";
import {map, tap} from "rxjs/operators";

@Injectable()
export class EmailEffects {

  constructor(private actions$: Actions) {
  }

  verifyEmail$ = createEffect(() => this.actions$.pipe(
    ofType(EmailActionTypes.VERIFY_EMAIL),
  ))
}
