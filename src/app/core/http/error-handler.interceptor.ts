import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Store} from "@ngrx/store";
import {environment} from '@env/environment';

import {Logger} from '../logger.service';
import {Router} from "@angular/router";
import {AppState} from "../../store/state/app.state";
import {Logout} from "../../store/actions/auth.actions";

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {

    if (response instanceof HttpErrorResponse) {
      if (!environment.production) {
        log.debug('error-handler', response);
      }
      if (response.status === 401 || response.status === 403) {
          this.store.dispatch(new Logout());
          this.router.navigate(['/login']);
      }
    }
    throw response;
  }
}
