import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@env/environment";
import {LocalStorage} from "@app/services/local-storage.service";
import {User} from "@app/models/user";
import {AppState} from "@app/store/state/app.state";
import {Store} from "@ngrx/store";
import {AuthenticationService} from "@app/services/auth/authentication.service";
import {BaseService} from "@app/services/base.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService {


  constructor(
    http: HttpClient,
    auth: AuthenticationService,
    router: Router) {
    super(http, auth, router)
  }


  createAccount(email: string, password: string) {
    return this.postAPI<User>(`${environment.BASE_API_URL}/register/`, JSON.stringify({
      email: email,
      password: password
    }))

  }

  sendVerifyEmail(email: string) {
    console.log('emailverify', email);
    console.log('postapiemailverify', this.postAPI(`${environment.BASE_API_URL}/auth/verify/`, JSON.stringify({email: email})));
    return this.postAPI(`${environment.BASE_API_URL}/auth/verify/`, email);

    // return this.postAPI(`${environment.BASE_API_URL}/auth/verify/`, JSON.stringify({
    //   email: email
    // }))
  }

  forgotPassword(email: string) {
    console.log('emailForgot', email);
    return this.postAPI(`${environment.BASE_API_URL}/auth/password-reset/`, JSON.stringify({
      email: email
    }));
  }

  socialConnectFb() {
    window.location.href = `${environment.BASE_API_URL}/socialconnect/facebook/token`;
  }

}
