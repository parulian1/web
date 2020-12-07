import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '@app/auth/login/login.component';
import {RegisterComponent} from '@app/auth/register/register.component';
import {ForgotPasswordComponent} from '@app/auth/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from "@app/auth/reset-password/reset-password.component";
import { VerifyConfirmComponent, VerifyConfirmResolver } from "@app/auth/verify-confirm-component";


const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token/:uid', component: ResetPasswordComponent },
  {
    path: 'verify/confirm/:token/:uid',
    component: VerifyConfirmComponent,
    resolve: [VerifyConfirmResolver]
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
