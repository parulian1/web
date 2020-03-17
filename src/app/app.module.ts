import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {environment} from '@env/environment';
import {CoreModule} from '@app/core';
import {SharedModule} from '@app/shared';
import {ShellModule} from './shell/shell.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from '@app/auth/auth.module';
import {PagesModule} from "@app/pages/pages.module";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RegisterService} from "@app/services/register.service";
import {AuthEffects} from "@app/store/effects/auth.effects";
import {authReducer} from "@app/store/reducers/auth.reducers";
import {reducers} from "@app/store/state/app.state";

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
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]) // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    RegisterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
