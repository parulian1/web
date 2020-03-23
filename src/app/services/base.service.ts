import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {AuthenticationService} from "@app/services/auth/authentication.service";

export interface IOptionHeaders {
  key: string;
  value: string;
}

@Injectable({ providedIn: 'root' })
export abstract class BaseService {
  tempLS: any;

  protected constructor(protected http: HttpClient, protected auth: AuthenticationService, protected router: Router) {}

  protected getAPI<T>(
    url: string,
    reload?: boolean,
    options?: Array<IOptionHeaders>,
    handleError?: boolean
  ): Observable<T> {
    return this.http
      .cache(reload)
      .get<T>(`${url}`, {
        headers: this.optionHeaders(options)
      })
      .pipe(tap(), catchError(this.handleError(handleError)));
  }

  protected postAPI<T>(url: string, data: any, options?: Array<IOptionHeaders>, handleError?: boolean): Observable<T> {
    return this.http
      .post<T>(`${url}`, data, {
        headers: this.optionHeaders(options)
      })
      .pipe(tap(), catchError(this.handleError(handleError)));
  }

  protected putAPI<T>(url: string, data: any, options?: Array<IOptionHeaders>, handleError?: boolean): Observable<T> {
    return this.http
      .put<T>(`${url}`, data, {
        headers: this.optionHeaders(options)
      })
      .pipe(tap(), catchError(this.handleError(handleError)));
  }

  protected deleteAPI<T>(url: string, handleError?: boolean): Observable<T> {
    return this.http
      .delete<T>(`${url}`, {
        headers: this.optionHeaders()
      })
      .pipe(tap(), catchError(this.handleError(handleError)));
  }

  protected handleError(handleError?: boolean) {
    return (error: HttpErrorResponse): Observable<any> => {
      if (!handleError) {
        if (error.status === 401) {
          this.auth.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
        } else if (error.status >= 500 || error.status === 0) {
          this.router.navigate(['/error'], { skipLocationChange: true });
        }
      }
      return throwError(error);
    };
  }

  protected optionHeaders(options?: Array<IOptionHeaders>): HttpHeaders {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Accept-Language': sessionStorage.getItem('language') || localStorage.getItem('language') || 'id-ID',
      'X-User-Agent': 'web-reader / web 1.0.0',
      'Content-Type': 'application/json'
    });
    if (!!options) {
      for (let i = 0; i < options.length; i++) {
        headers = headers.append(options[i].key, options[i].value);
      }
    }
    if (this.auth.isAuthenticated()) {
      const token = this.auth.credentials.payload.token;
      console.log('token', token);
      // headers = headers.append('Authorization', 'JWT ' + token);
      headers = headers.set('Authorization', 'JWT ' + token);

    }
    return headers;
  }
}
