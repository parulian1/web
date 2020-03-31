import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CredentialsService } from './credentials.service';
import {Credentials} from "@app/models/credentials";

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private credentialsService: CredentialsService) { }

  /**
   * Register the user.
   * @param context The register parameters.
   * @return The user credentials.
   */
  register(context: Credentials): Observable<Credentials> {
    this.credentialsService.setCredentials(context);
    return of(context);
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: Credentials): Observable<Credentials> {
    // Replace by proper authentication call
    this.credentialsService.setCredentials(context);
    return of(context);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

}
