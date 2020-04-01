import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "@app/pages/home/home.component";
import {ProfileComponent} from "@app/pages/profile/profile.component";
import {extract} from "@app/core";
import {AuthenticationGuard} from "@app/core/authentication/authentication.guard";
import {ChangePasswordComponent} from "@app/pages/profile/change-password/change-password.component";
import {UserProfileComponent} from "@app/pages/profile/user-profile/user-profile.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, data: {title: extract('Martha Tilaar Shop')}},
  {
    path: 'profile',
    component: ProfileComponent,
    data: {title: extract('Martha Tilaar Shop')},
    canActivate: [AuthenticationGuard],
    children: [
      {path: '', component: UserProfileComponent},
      {path: 'change-password', component: ChangePasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
