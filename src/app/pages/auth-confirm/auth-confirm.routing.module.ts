import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthConfirmComponent} from '@app/pages/auth-confirm/auth-confirm.component';
import {AuthConfirmResolver} from '@app/pages/auth-confirm/auth-confirm.resolver';

const routes: Routes = [
  {
    path: ':token/:uid',
    component: AuthConfirmComponent,
    resolve: {confirm: AuthConfirmResolver},
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthConfirmRoutingModule {
}

