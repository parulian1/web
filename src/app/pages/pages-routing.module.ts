import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "@app/pages/home/home.component";
import {ProfileComponent} from "@app/pages/profile/profile.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, data:{title: 'Martha Tilaar Shop'}},
  {path: 'profile', component: ProfileComponent, data:{title: 'Martha Tilaar Shop'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
