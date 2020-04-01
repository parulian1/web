import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '@app/auth/login/login.component';
import {RegisterComponent} from '@app/auth/register/register.component';
import {ForgotPasswordComponent} from "@app/auth/forgot-password/forgot-password.component";
import {extract} from "@app/core";


const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
