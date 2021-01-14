import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthSocial} from '@app/models/auth-social/auth-social';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthSocialService {

  lists: Array<AuthSocial>;
  authConfig = {} as SocialAuthServiceConfig;

  constructor(private httpClient: HttpClient) {
  }

  fetchList(query?: string, page: number = 1, perPage?: number): Observable<Array<AuthSocial>> {
    const params = new HttpParams();

    return this.httpClient.get<Array<AuthSocial>>('/iam/auth/social-link/',
      {observe: 'body', responseType: 'json', params});
  }

  fetchConfig() {
    // Crazy code, need refactor :/
    return this.fetchList().pipe(
      map((res) => {
        return {
          autoLogin: false,
          providers: res.map((resData) => {
            switch (resData.authType) {
              case 'google-oauth2':
                return {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(resData.appKey)
                }
              case 'facebook':
                return {
                  id: FacebookLoginProvider.PROVIDER_ID,
                  provider: new FacebookLoginProvider(resData.appKey)
                }
            }
          })
        } as SocialAuthServiceConfig;
      })
    ).toPromise();
  }


}
