import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {TranslateModule} from "@ngx-translate/core";
import {CoreModule} from "@app/core";
import {SharedModule} from "@app/shared";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "@app/material.module";
import {HomeComponent} from "@app/pages/home/home.component";
import {ProfileComponent} from "@app/pages/profile/profile.component";
import {ShellModule} from "@app/shell/shell.module";
import {AuthenticationService} from "@app/services/auth/authentication.service";


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    ShellModule,
    PagesRoutingModule,
  ],
  providers: [
    AuthenticationService
  ]
})
export class PagesModule {
}
