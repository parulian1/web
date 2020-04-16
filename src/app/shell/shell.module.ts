import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@app/material.module';
import {HeaderComponent} from './header/header.component';
import {ShellComponent} from '@app/shell/shell.component';
import {SharedModule} from '@app/shared';
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import { SlaComponent } from './sla/sla.component';
import { BannerComponent } from './banner/banner.component';
import { TestimonialComponent } from './testimonial/testimonial.component';


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
    HeaderComponent,
    SlaComponent,
    BannerComponent,
    TestimonialComponent
  ],
  exports: [
    ShellComponent,
    HeaderComponent,
    SlaComponent,
    BannerComponent,
    TestimonialComponent
  ],
  providers:[
    DatePipe
  ]
})
export class ShellModule {
}
