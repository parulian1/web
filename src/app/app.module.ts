import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {environment} from '@env/environment';
import {CoreModule, ErrorHandlerInterceptor} from '@app/core';
import {SharedModule} from '@app/shared';
import {ShellModule} from './shell/shell.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from '@app/auth/auth.module';
import {PagesModule} from "@app/pages/pages.module";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthUserService} from "@app/services/auth-user.service";
import {AuthEffects} from "@app/store/effects/auth.effects";
import {reducers} from "@app/store/state/app.state";
import {EmailEffects} from "@app/store/effects/email.effects";
import {TokenInterceptor} from "@app/core/http/token.interceptor";
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.FB_APPLICATION_ID)
  },
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.GOOGLE_APPLICATION_ID)
  }
]);

export function provideConfig() {
  return config;
}

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
    PagesModule,
    AuthModule,
    SocialLoginModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, EmailEffects]) // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    AuthUserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
