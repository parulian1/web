import {Injectable} from '@angular/core';
import {Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {ProfileService} from '@app/services';
import {Customer} from '@app/models/customer';

/**
 * Returns the profile data for the currently authenticated customer.
 */
@Injectable({
  providedIn: 'root',
})
export class CurrentProfileResolver implements Resolve<Customer> {

  constructor(private service: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> {
    return this.service.getCurrentUserProfile();
  }
}
