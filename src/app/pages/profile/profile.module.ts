import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '@app/material.module';
import {SharedModule} from '@app/shared';
import {ShellModule} from '@app/shell';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {UserProfileComponent} from './user-profile';
import {
  ListAddressComponent,
  AddressFormDialogComponent,
  AddressDeleteDialogComponent,
  AddressPaginationComponent,
  AddressMapComponent,
} from '@app/pages/profile/list-address';
import {ChangePasswordComponent} from './change-password';
import {
  ListWishlistComponent,
  WishlistSelectWarehouseComponent,
  WishlistSearchComponent,
  WishlistPaginationComponent,
} from '@app/pages/profile/list-wishlist';
import {EditProfileComponent} from './edit-profile.component';
import {OrderHistoryListComponent, OrderDetailsComponent} from './order-history';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {GoogleMapsModule} from '@angular/google-maps';
import {PaymentComponent} from '@app/pages/profile/payment';
import { ListReviewComponent } from '@app/pages/profile/list-review';
import { ReviewCardComponent } from './list-review/review-card/review-card.component';
import {
  DialogSaveCatalogComponent,
  DropShipListsComponent,
  SavedCatalogComponent,
  SavedCatalogListComponent
} from '@app/pages/profile/drop-shipping';
import { OrderProductBoxComponent } from '@app/pages/profile/order-history/order-product-box';

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
        GoogleMapsModule
    ],
})
export class ProfileModule { }
