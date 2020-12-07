import '@angular/common/locales/global/id';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {TranslateModule} from '@ngx-translate/core';
import {environment} from '@env/environment';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from 'angularx-social-login';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {GoogleMapsModule} from '@angular/google-maps';

import {AuthModule} from '@app/auth/auth.module';
import {CoreModule, TokenInterceptor} from '@app/core';
import {ShellModule} from '@app/shell';
import {AuthUserService} from '@app/services';
import {SharedModule} from '@app/shared';
import {effects} from '@app/store';
import {reducers} from '@app/store/state/app.state';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material.module';
import {FocusedLayoutComponent, MainLayoutComponent} from '@app/layouts';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    // PagesModule,
    AuthModule,
    SlickCarouselModule,
    SocialLoginModule,
    AppRoutingModule,
    GoogleMapsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([effects.AuthEffects, effects.EmailEffects, effects.CartEffects])
  ],
  declarations: [
    AppComponent,
    MainLayoutComponent,
    FocusedLayoutComponent,
  ],
  providers: [
    AuthUserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_APPLICATION_ID)
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.FB_APPLICATION_ID)
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {provide: LOCALE_ID, useValue: 'id'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
