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
import { ForgotFormComponent } from './forgot-form/forgot-form.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

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
    SocialButtonComponent,
    ForgotFormComponent,
    AuthButtonComponent,
    SideMenuComponent
  ],
    exports: [
        LoaderComponent,
        SearchBarComponent,
        StoreLocationComponent,
        AuthFormComponent,
        SocialButtonComponent,
        ForgotFormComponent,
        AuthButtonComponent,
        SideMenuComponent
    ]
})
export class SharedModule { }
