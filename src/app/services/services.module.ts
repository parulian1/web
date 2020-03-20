import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterService} from "@app/services/register.service";
import {AuthenticationService} from "@app/services/auth/authentication.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    RegisterService,
    AuthenticationService
  ]
})
export class ServicesModule { }
