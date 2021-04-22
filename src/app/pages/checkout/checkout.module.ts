import {NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {CheckoutRoutingModule} from './checkout-routing.module';
import {CheckoutComponent} from '@app/pages/checkout/checkout.component';
import {ShellModule} from '@app/shell/shell.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SharedModule} from '@app/shared';
import {
  CheckoutAddressComponent,
  CheckoutAddressFormDialogComponent,
  CheckoutAddressMapComponent,
  AddAddressDialogComponent
} from '@app/pages/checkout/checkout-address';
import {ShippingMethodComponent} from '@app/pages/checkout/shipping-method';
import {MatSelectModule} from '@angular/material/select';
import {PaymentMethodComponent} from '@app/pages/checkout/payment-method';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EntityToSlugPipe} from '@app/shared/utils/entity-to-slug.pipe';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {PortalModule} from '@angular/cdk/portal';
import {GoogleMapsModule} from '@angular/google-maps';
import {SelectPriceComponent} from '@app/pages/checkout/shipping-method/select-price';
import {MatButtonModule} from '@angular/material/button';
import { CartSummaryComponent } from '@app/pages/checkout/cart-summary';
import {CartModule} from '@app/pages/cart/cart.module';
import { CheckoutCreditCardChoiceComponent } from './containers';
import {GtagModule} from '@app/library/gtagjs/gtag.module';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ErrorCheckoutDialogComponent } from './error-checkout-dialog/error-checkout-dialog.component';


@NgModule({
    declarations: [
        CheckoutComponent,
        CheckoutAddressComponent,
        CheckoutAddressFormDialogComponent,
        CheckoutAddressMapComponent,
        AddAddressDialogComponent,
        ShippingMethodComponent,
        PaymentMethodComponent,
        SelectPriceComponent,
        CartSummaryComponent,
        CheckoutCreditCardChoiceComponent,
        ErrorCheckoutDialogComponent,
    ],
    imports: [
        CommonModule,
        CheckoutRoutingModule,
        ShellModule,
        MatToolbarModule,
        SharedModule,
        MatSelectModule,
        MatRadioModule,
        MatExpansionModule,
        FormsModule,
        MatIconModule,
        MatDatepickerModule,
        MatDialogModule,
        PortalModule,
        ReactiveFormsModule,
        GoogleMapsModule,
        MatButtonModule,
        CartModule,
        MatCheckboxModule,
      GtagModule
    ],
    exports: [
        CheckoutAddressMapComponent
    ],
    providers: [EntityToSlugPipe, TitleCasePipe]
})
export class CheckoutModule {
}
