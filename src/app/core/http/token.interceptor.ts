import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {CredentialsService} from "@app/core/authentication/credentials.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private creds: CredentialsService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.creds.isAuthenticated()) {
      req = req.clone({
        headers: req.headers
          .set('Authorization', 'JWT ' + this.creds.token)

      });
    }

    req = req.clone({
      headers: req.headers
        .set('Content-Type', 'application/json')
    });


    return next.handle(req);
  }

}
