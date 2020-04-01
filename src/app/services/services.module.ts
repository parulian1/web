import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthUserService} from "@app/services/auth-user.service";
import {AuthenticationService} from "@app/services/auth/authentication.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    AuthUserService,
    AuthenticationService
  ]
})
export class ServicesModule { }
