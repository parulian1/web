import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CredentialsService} from '@app/core/authentication/credentials.service';
import {environment} from '@env/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private creds: CredentialsService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqUrl: RegExp = /^\/api(.*)/i;

    if (req.url.startsWith(environment.BASE_API_URL) || req.url.startsWith('/api')) {
      if (this.creds.isAuthenticated()) {
        req = req.clone({
          headers: req.headers
            .set('Authorization', 'Bearer ' + this.creds.token)
        });
      }

      // req = req.clone({
      //   headers: req.headers
      //     .set('Content-Type', 'application/json')
      // });
    }
    return next.handle(req);
  }

}
