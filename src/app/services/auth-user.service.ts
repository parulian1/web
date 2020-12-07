import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Credentials} from '@app/models/credentials';
import {SocialAuth} from '@app/models/social-auth';
import {Observable} from "rxjs";
import {VerifyEmail} from "@app/models/auth";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {


  constructor(private http: HttpClient) {
  }


  createAccount(email: string, password: string) {
    return this.http
      .post<Credentials>(`/iam/auth/register/`, {email, password}).pipe(
        delay(500),
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<Credentials>(`/iam/auth/login/`, {
        email,
        password
      });
  }

  sendVerifyEmail(email: string) {
    return this.http
      .cache()
      .post(`/iam/auth/verify/`, {email});
  }

  forgotPassword(email: string) {
    return this.http
      .cache()
      .post(`/iam/auth/password-reset/`, {email});
  }

  changePassword(passwordData: {password: string, passwordConfirm: string, oldPassword: string}) {
    return this.http
      .cache()
      .put(`/iam/auth/password-change/`, passwordData);
  }

  socialConnectFb(fbToken: string) {
    return this.http
      .cache()
      .post<Credentials>(`/iam/social-auth/facebook/`, {access_token: fbToken});
  }

  socialConnectFbProfile(googleToken: string) {
    return this.http
      .cache()
      .post<Credentials>(`/iam/social-auth/facebook/connect/`, {access_token: googleToken});
  }
  socialDisconnectFbProfile(): Observable<any> {
    return this.http
      .cache()
      .delete<any>(`/iam/social-auth/facebook/disconnect/`)
  }

  socialConnectGoogle(googleToken: string) {
    return this.http
      .cache()
      .post<Credentials>(`/iam/social-auth/google-oauth2/`, {access_token: googleToken});
  }

  socialConnectGoogleProfile(googleToken: string) {
    return this.http
      .cache()
      .post<Credentials>(`/iam/social-auth/google-oauth2/connect/`, {access_token: googleToken});
  }
  socialDisconnectGoogleProfile(): Observable<any> {
    return this.http
      .cache()
      .delete<any>(`/iam/social-auth/google-oauth2/disconnect/`)
  }

  getSocialLink() {
    return this.http
      .cache(true)
      .get<SocialAuth[]>(`/iam/social-auth/`);
  }

  postEmailVerification(token: string, uid: string): Observable<any> {
    return this.http
      .get<any>(`/iam/auth/verify/confirm/${token}/${uid}/`, {
        observe: 'response',
        responseType: 'json'
      });
  }

  checkEmailVerification(email: string): Observable<HttpResponse<VerifyEmail>> {
    return this.http
      .get<VerifyEmail>(`/iam/auth/verify/reminder/`
        , {observe: 'response', responseType: 'json'});
  }

  resetPassword({password, uid, token}): Observable<any> {
    return this.http.post<any>(`/iam/auth/password-reset/${token}/${uid}/`, {password});
  }

  refreshToken(token: string): Observable<HttpResponse<Credentials>> {
    return this.http
      .post<Credentials>(`/iam/auth/refresh/`,
        {refresh: token},
        {observe: 'response', responseType: 'json'});
  }

  verifyUser({ uid, token }): Observable<any> {
    return this.http.post<any>(`/iam/auth/verify/confirm/${token}/${uid}/`, {});
  }
  verifyEmail(): Observable<any> {
    return this.http.get<any>(`/iam/auth/verify-email/`);
  }
}
