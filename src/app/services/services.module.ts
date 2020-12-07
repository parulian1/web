import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthUserService} from "@app/services/auth-user.service";
import {AuthenticationService} from "@app/core/authentication/authentication.service";
import {SlaService} from "@app/services/sla.service";
import {BannerService} from "@app/services/banner.service";
import {BlogService} from "@app/services/blog.service";
import {BrandService} from "@app/services/brand.service";
import {CartService} from "@app/services/cart.service";
import {CheckoutService} from "@app/services/checkout.service";
import {LocalStorage} from "@app/services/local-storage.service";
import {NavigationService} from "@app/services/navigation.service";
import {PaginationService} from "@app/services/pagination.service";
import {PaymentMethodService} from "@app/services/payment-method.service";
import {ShippingMethodService} from "@app/services/shipping-method.service";
import {StoreService} from "@app/services/store.service";
import {TestimonialService} from "@app/services/testimonial.service";
import {UserAddressBookService} from "@app/services/user-address-book.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthUserService,
    AuthenticationService,
    BannerService,
    BlogService,
    BrandService,
    CartService,
    CheckoutService,
    LocalStorage,
    NavigationService,
    PaginationService,
    PaymentMethodService,
    ShippingMethodService,
    SlaService,
    StoreService,
    TestimonialService,
    UserAddressBookService
  ]
})
export class ServicesModule { }
