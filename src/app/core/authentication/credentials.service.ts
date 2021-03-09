import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";

import { Credentials } from '../../models/credentials';
import { Token } from '../../models/auth';
import { AppState } from "../../store/state/app.state";
import { JwtHelperService } from "@auth0/angular-jwt";

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private static TEN_MINUTES = 1_000 * 60 * 10;

  private _credentials: Credentials | null = null;
  private _notification: Notification | null = null;

  constructor(
    private store: Store<AppState>) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get email(): string {
    if (this.credentials) {
      const creds = JSON.parse(localStorage.getItem('credentials'));
      return creds.email;
    }

    return null;
  }

  get refreshToken(): string {
    if (!this.credentials) {
      return null;
    }
    return this.credentials.refresh;
  }

  /**
   * Indicates whether the current token is expired.
   */
  get isTokenExpired(): boolean {
    if (!this.parsedToken) {
      return false;
    }
    return this.tokenExpired(this.parsedToken.exp);
  }

  get isRefreshTokenExpired(): boolean {
    if (!this.parsedRefreshToken) {
      return false;
    }
    return this.tokenExpired(this.parsedRefreshToken.exp);
    // return this.parsedRefreshToken.exp <= Date.now();
  }

  get canRefreshToken(): boolean {
    if (!this.parsedRefreshToken) {
      return false;
    }
    return !this.isRefreshTokenExpired;
  }

  get shouldRefreshToken(): boolean {
    if (this.isAuthenticated() && this.tokenExpired(this.parsedToken.exp, CredentialsService.TEN_MINUTES)) {
      // if the user's token is expiring within 10 minutes
      return true;
    } else if (this.canRefreshToken) {
      // user's refresh token is still valid
      return true;
    } else {
      return false;
    }
  }


  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    const savedCreds = localStorage.getItem(credentialsKey);

    if (savedCreds) {
      this._credentials = JSON.parse(savedCreds);
    } else {
      this._credentials = null;
    }

    return this._credentials;
  }

  /**
   * Gets the user's JWT Token.
   * @return The user's token if user is authenticated.
   */
  get token(): string | null {
    if (this.isAuthenticated()) {
      return this._credentials.access;
    }
  }

  set token(value: string) {
    if (value === this.token) {
      return;
    }

    if (value === null) {
      localStorage.removeItem('credentials');
    } else {
      const creds = JSON.parse(localStorage.getItem('credentials'));
      const updatedCreds = {
        access: value,
        email: creds.email,
        refresh: this.refreshToken
      };
      localStorage.removeItem('credentials');
      localStorage.setItem(credentialsKey, JSON.stringify(updatedCreds));

    }
  }


  /**
   * Returned the parsed data from within the user's stored JWT.
   */
  get parsedToken(): Token | null {
    if (this.isAuthenticated()) {
      const helper = new JwtHelperService();
      return helper.decodeToken(this.token) as Token;
    }
  }

  get parsedRefreshToken(): Token {
    if (!!this.refreshToken) {
      const refreshTokenBody = this.refreshToken.split('.')[1];
      return JSON.parse(atob(refreshTokenBody)) as Token;
    }
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = localStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      localStorage.removeItem(credentialsKey);
      localStorage.removeItem('message');
    }
  }

  setVerifyEmail(res: object) {
    if (res) {
      localStorage.setItem('message', JSON.stringify(res));
    }
  }

  setNewToken(newToken: string) {
    this._credentials.access = newToken;
  }

  private tokenExpired(expiry: number, extra: number = 0): boolean {
    return (Math.floor((new Date()).getTime() / 1000) + extra) >= expiry;
  }

  getIsReseller(): boolean {
    if (!this.parsedToken) {
      return false;
    }
    return this.parsedToken.is_reseller;
  }
}
