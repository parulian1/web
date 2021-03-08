import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared';
import { ShellModule } from '@app/shell';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserProfileComponent } from './user-profile';
import {
  AddressDeleteDialogComponent,
  AddressFormDialogComponent,
  AddressMapComponent,
  AddressPaginationComponent,
  ListAddressComponent,
} from '@app/pages/profile/list-address';
import { ChangePasswordComponent } from './change-password';
import {
  ListWishlistComponent,
  WishlistPaginationComponent,
  WishlistSearchComponent,
  WishlistSelectWarehouseComponent,
} from '@app/pages/profile/list-wishlist';
import { EditProfileComponent } from './edit-profile.component';
import { OrderDetailsComponent, OrderHistoryListComponent } from './order-history';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { GoogleMapsModule } from '@angular/google-maps';
import { PaymentComponent } from '@app/pages/profile/payment';
import { ListReviewComponent } from '@app/pages/profile/list-review';
import { ReviewCardComponent } from '@app/pages/profile/list-review/review-card';
import {
  DialogSaveCatalogComponent,
  DropShipListsComponent,
  SavedCatalogComponent,
  SavedCatalogListComponent,
  SavedCatalogQtyComponent
} from '@app/pages/profile/drop-shipping';
import { OrderProductBoxComponent } from '@app/pages/profile/order-history/order-product-box';
import { ReviewCardSingleComponent } from '@app/pages/profile/list-review/review-card-single';
import { CheckoutModule } from '@app/pages/checkout';

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    UserProfileComponent,
    ListAddressComponent,
    AddressFormDialogComponent,
    AddressDeleteDialogComponent,
    AddressPaginationComponent,
    AddressMapComponent,
    ChangePasswordComponent,
    ListWishlistComponent,
    WishlistSearchComponent,
    WishlistPaginationComponent,
    WishlistSelectWarehouseComponent,

    OrderDetailsComponent,
    OrderHistoryListComponent,
    PaymentComponent,
    ListReviewComponent,
    ReviewCardComponent,

    DropShipListsComponent,
    SavedCatalogListComponent,
    SavedCatalogComponent,
    DialogSaveCatalogComponent,
    OrderProductBoxComponent,
    ReviewCardSingleComponent,
    SavedCatalogQtyComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShellModule,
    ReactiveFormsModule,
    MaterialModule,
    ProfileRoutingModule,
    InfiniteScrollModule,
    NgxDaterangepickerMd.forRoot(),
    FormsModule,
    GoogleMapsModule,
    CheckoutModule
  ],
})
export class ProfileModule {
}
