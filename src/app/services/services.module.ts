import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthUserService} from "@app/services/auth-user.service";
import {AuthenticationService} from "@app/core/authentication/authentication.service";
import {SlaService} from "@app/services/sla.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    AuthUserService,
    AuthenticationService,
    SlaService
  ]
})
export class ServicesModule { }
