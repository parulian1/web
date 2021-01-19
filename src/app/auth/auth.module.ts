import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ShellModule } from '@app/shell/shell.module';
import { SharedModule } from '@app/shared';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyConfirmComponent } from './verify-confirm-component';
import {GtagModule} from '@app/library/gtagjs/gtag.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent, VerifyConfirmComponent],
    imports: [
        CommonModule,
        ShellModule,
        SharedModule,
        MatButtonToggleModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        GtagModule,
    ]
})
export class AuthModule {
}
