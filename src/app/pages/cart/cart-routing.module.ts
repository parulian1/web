import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CartComponent} from '@app/pages/cart/cart.component';
import {CartResolverService} from '@app/pages/cart/cart-resolver.service';
import {AuthenticationGuard} from '@app/core/authentication';
import { authentication } from '@app/core';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    canActivate: [authentication.AuthenticationGuard],
    resolve: {
      cartResponse: CartResolverService
    },
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {
}
