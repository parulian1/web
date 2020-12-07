import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CartComponent} from '@app/pages/cart/cart.component';
import {CartResolverService} from '@app/pages/cart/cart-resolver.service';
import {AuthenticationGuard} from "@app/core/authentication";

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    canActivate: [AuthenticationGuard],
    resolve: {
      cart: CartResolverService
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
