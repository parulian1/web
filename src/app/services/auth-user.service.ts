import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment";
import {User} from "@app/models/user";
import {BaseService} from "@app/services/base.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "@app/core/authentication/authentication.service";
import {CredentialsService} from "@app/core/authentication/credentials.service";
import {env} from "@env/.env";
import {Credentials} from "@app/models/credentials";


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {


  constructor(private http: HttpClient) {
  }


  createAccount(email: string, password: string) {
    return this.http
      .cache()
      .post<Credentials>(`/iam/register/`, JSON.stringify({email: email, password: password}));
  }

  login(email: string, password: string) {
    return this.http
      .cache()
      .post<Credentials>(`/iam/login/`, JSON.stringify({email: email, password: password}));
  }

  sendVerifyEmail(email: string) {
    return this.http
      .cache()
      .post(`/iam/auth/verify/`, JSON.stringify({email: email}))
  }

  forgotPassword(email: string) {
    return this.http
      .cache()
      .post(`/iam/auth/password-reset/`, JSON.stringify({email: email}));
  }

  changePassword(password: string, password_confirm: string, old_password: string) {
    return this.http
      .cache()
      .put(`/iam/auth/password-change/`, JSON.stringify({
        password: password,
        password_confirm: password_confirm,
        old_password: old_password
      }))
  }

  socialConnectFb() {
    window.location.href = `/iam/socialconnect/facebook/token`;
  }

}
