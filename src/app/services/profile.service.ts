import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';

import {CredentialsService} from '@app/core/authentication';
import {drf, customer} from '@app/models';
import {Addresses} from "@app/models/addresses";

/**
 * Retrieves data about the currently-authenticated customer.
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private credentialsService: CredentialsService) { }

  /**
   * Gets the user profile data for the user (if they are currently logged in)
   */
  getCurrentUserProfile(): Observable<customer.Customer> | Observable<never> {
    if (this.credentialsService.isAuthenticated()) {
      const tokenData = this.credentialsService.parsedToken;
      return this.http.get<customer.Customer>(
        `/iam/customer/${tokenData.user_id}/`,
        {responseType: 'json', observe: 'body'}
      );
    }
    return throwError(new Error('You must login, first.'));
  }

  /**
   * Updates the user's profile and returns the updated representation of their
   * full profile data
   *
   * @param newProfileData The newly-updated customer profile data.
   */
  update(newProfileData: customer.Customer): Observable<HttpResponse<customer.Customer>> | Observable<never> {
    if (this.credentialsService.isAuthenticated()) {
      const tokenData = this.credentialsService.parsedToken;
      return this.http.patch<customer.Customer>(
        `/iam/customer/${tokenData.user_id}/`,
        newProfileData,
        {responseType: 'json', observe: 'response'}
      );
    }
    return throwError(new Error('You must login, first.'));
  }

  fetchListAddresses(): Observable<HttpResponse<any>> {
    return this.http
      .get<Addresses[]>(`/iam/address/`, {observe: 'response'});
  }

  /**
   * Gets the available 'genders' and their display names
   */
  getGenderOptions(): Observable<drf.Choice[]> {
    // @ts-ignore
    return this.http
      .options<drf.OptionsResponse>(
        '/iam/customer/',
        {observe: 'body', responseType: 'json'})
      .pipe(
        map(
          resp => (resp.actions.POST['profile']['children']['gender'] as drf.ChoiceField).choices
        )
      );
  }
}
