import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {Page} from '@app/models';
import {PageService} from '@app/services';

/**
 * Attempts to fetch a flat-page with a path matching the current url path.
 * If not found, then navigates to the
 */
@Injectable({
  providedIn: 'root'
})
export class PageResolver implements Resolve<Page> {

  constructor(private service: PageService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page> {
    return this.service.getPage(route.params['path']).pipe(catchError(err => {
      this.router.navigate(['/errors/not-found']);
      return EMPTY;
    }));
  }
}
