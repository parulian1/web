import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Credentials} from "@app/models/credentials";
import {AuthService} from "angularx-social-login";
import {SocialAuth} from "@app/models/social-auth";

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

  socialConnectFb(fbToken: string) {
    return this.http
      .cache()
      .post<Credentials>(`/iam/social-auth/facebook/`, JSON.stringify({
        access_token: fbToken
      }))
  }

  socialConnectGoogle(googleToken: string) {
    return this.http
      .cache()
      .post<Credentials>(`/iam/social-auth/google-oauth2/`, JSON.stringify({
        access_token: googleToken
      }))
  }

  getSocialLink(){
    return this.http
      .cache(true)
      .get<SocialAuth[]>(`/iam/social-auth/`);
  }

}
