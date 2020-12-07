import {Action} from '@ngrx/store';

export enum EmailActionTypes {
  VERIFY_EMAIL = '[Email] Verify Email',
  VERIFY_SENT = '[Email] Verify Email Sent'
}

export class VerifyEmail implements Action {
  readonly type = EmailActionTypes.VERIFY_EMAIL;

  constructor(public payload: any) {
  }
}

export class VerifySent implements Action {
  readonly type = EmailActionTypes.VERIFY_SENT;

  constructor(public payload: any) {
  }
}

export type AllEmail =
  | VerifySent
  | VerifyEmail;

