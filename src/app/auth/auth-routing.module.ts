import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '@app/auth/login/login.component';
import {RegisterComponent} from '@app/auth/register/register.component';


const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: {title: 'Martha Tilaar Shop'} },
  { path: 'register', component: RegisterComponent, data: {title: 'Martha Tilaar Shop'}}
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
