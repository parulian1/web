import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import {SearchBarComponent} from '@app/shared/search-bar/search-bar.component';
import {StoreLocationComponent} from '@app/shared/store-location/store-location.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SocialButtonComponent } from './social-button/social-button.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    LoaderComponent,
    SearchBarComponent,
    StoreLocationComponent,
    AuthFormComponent,
    SocialButtonComponent
  ],
  exports: [
    LoaderComponent,
    SearchBarComponent,
    StoreLocationComponent,
    AuthFormComponent,
    SocialButtonComponent
  ]
})
export class SharedModule { }
