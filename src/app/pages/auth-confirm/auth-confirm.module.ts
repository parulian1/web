import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ShellModule} from '@app/shell';
import {SharedModule} from '@app/shared';

import {AuthConfirmComponent} from '@app/pages/auth-confirm/auth-confirm.component';
import {AuthConfirmRoutingModule} from '@app/pages/auth-confirm/auth-confirm.routing.module';


@NgModule({
  declarations: [AuthConfirmComponent],
  imports: [
    CommonModule,
    ShellModule,
    SharedModule,
    AuthConfirmRoutingModule
  ]
})
export class AuthConfirmModule { }
