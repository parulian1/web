import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@app/material.module';
import {HeaderComponent} from './header/header.component';
import {ShellComponent} from '@app/shell/shell.component';
import {SharedModule} from '@app/shared';
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
  ],
  declarations: [
    ShellComponent,
    HeaderComponent
  ],
  exports: [
    ShellComponent,
    HeaderComponent
  ]
})
export class ShellModule {
}
