import {Action, createAction, props} from '@ngrx/store';
import {User} from "@app/models/user";

export enum AuthActionTypes {
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILED = '[Auth] Register Failed',
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;

  constructor(public payload: any) {
  }
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;

  constructor(public payload: any) {
  }
}

export class RegisterFailed implements Action {
  readonly type = AuthActionTypes.REGISTER_FAILED;
  constructor(public payload: any) {}
}

export type All =
  | Register
  | RegisterSuccess
  | RegisterFailed
