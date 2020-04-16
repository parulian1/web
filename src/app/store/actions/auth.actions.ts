import {Action, createAction, props} from '@ngrx/store';
import {User} from "@app/models/user";

export enum AuthActionTypes {
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILED = '[Auth] Register Failed',
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGOUT = '[Auth] Logout',
  FORGOT_PASSWORD = '[Auth] Forgot Password',
  CHANGE_PASSWORD = '[Auth] Change Password',
  CHANGE_PASSWORD_SUCCESS = '[Auth] Change Password Success',
  AUTH_FACEBOOK = '[Auth] Social Connect Facebook',
  AUTH_GOOGLE = '[Auth] Social Connect Google'
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

  constructor(public payload: any) {
  }
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: any) {

  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) {

  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class ForgotPassword implements Action {
  readonly type = AuthActionTypes.FORGOT_PASSWORD;

  constructor(public payload: any) {
  }
}

export class ChangePassword implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD;

  constructor(public payload: any) {
  }
}

export class ChangePasswordSuccess implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class AuthFacebook {
  readonly type = AuthActionTypes.AUTH_FACEBOOK;

}

export class AuthGoogle {
  readonly type = AuthActionTypes.AUTH_GOOGLE;
}




export type All =
  | Register
  | RegisterSuccess
  | RegisterFailed
  | Logout
  | ForgotPassword
  | ChangePassword
  | Login
  | LoginSuccess
  | AuthFacebook


