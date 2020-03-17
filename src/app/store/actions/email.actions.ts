import {Action} from "@ngrx/store";

export enum EmailActionTypes {
  VERIFY_EMAIL = '[Email] Verify Email',
  SEND_VERIFY = '[Email] Send Verify'
}

export class VerifyEmail implements Action {
  readonly type = EmailActionTypes.VERIFY_EMAIL;

  constructor(public payload: any) {
  }
}

