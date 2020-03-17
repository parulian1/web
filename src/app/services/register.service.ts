import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@env/environment";
import {BaseApiService} from "@app/services/base-api.service";
import {LocalStorage} from "@app/services/local-storage.service";
import {User} from "@app/models/user";
import {catchError, filter} from "rxjs/operators";
import {AppState} from "@app/store/state/app.state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseApiService {


  constructor(http: HttpClient, localStorage: LocalStorage, private store: Store<AppState>) {
    super(http, localStorage);
  }


  createAccount(email: string, password: string) {
    return this.http.post<User>(`${environment.BASE_API_URL}/register/`, JSON.stringify({
      email: email,
      password: password
    }));
  }

  sendVerifyEmail(email: string) {
    let token = localStorage.getItem('token');


    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', 'JWT ' + token);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE'
      })
    };

    httpOptions.headers.append("Test", `JWT ${token}`);

    httpOptions.headers =
      httpOptions.headers.set("Authorization", `JWT ${token}`);
    httpOptions.headers =
      httpOptions.headers.set('Content-Type', 'application/json');

    //
    return this.http.post<User>(`${environment.BASE_API_URL}/auth/verify/`, JSON.stringify({
      email: email
    }), {headers: this.buildHeaders('application/json')});
  }

}
