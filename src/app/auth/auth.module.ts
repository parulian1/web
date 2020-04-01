import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AuthRoutingModule} from '@app/auth/auth-routing.module';
import {ShellModule} from '@app/shell/shell.module';
import {SharedModule} from '@app/shared';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    ShellModule,
    SharedModule,
    MatButtonToggleModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
