import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CheckoutComponent} from './checkout.component';
import {CheckoutResolverService} from '@app/pages/checkout/checkout-resolver.service';
import {ShippingMethodResolverService} from '@app/pages/checkout/shipping-method/shipping-method-resolver.service';
import {PaymentMethodResolverService} from '@app/pages/checkout/payment-method/payment-method-resolver.service';
import {CartResolverService} from '@app/pages/cart/cart-resolver.service';
import {DefaultAddressResolverService} from '@app/pages/checkout/default-address-resolver.service';
import {ProvincesResolver} from '@app/pages/checkout/provinces.resolver';
import {authentication} from '@app/core';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    canActivate: [authentication.AuthenticationGuard],
    resolve: {
      addresses: CheckoutResolverService,
      defaultAddress: DefaultAddressResolverService,
      shipping: ShippingMethodResolverService,
      payment: PaymentMethodResolverService,
      cart: CartResolverService,
      provinces: ProvincesResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {
}
