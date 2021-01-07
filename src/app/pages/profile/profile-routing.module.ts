import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract, authentication } from '@app/core';

import { GenderResolver } from './gender.resolver';
import { CurrentProfileResolver } from './current-profile.resolver';
import { EmailVerifyResolver } from './email-verify.resolver';

import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile.component';
import { UserProfileComponent } from './user-profile';
import { ListAddressComponent, AddressListResolver } from "./list-address";
import { ChangePasswordComponent } from './change-password';
import {
  ListWishlistComponent,
  WishlistListResolver
} from './list-wishlist';
import {
  OrderHistoryListComponent,
  OrderListResolver,
  OrderDetailsComponent,
  OrderResolver,
  OrderProfileResolver
} from './order-history';
import { OrderStatusResolver } from '@app/pages/profile/order-history/order-status.resolver';
import { PaymentComponent } from '@app/pages/profile/payment';
import { PaymentResolver } from '@app/pages/profile/payment/payment.resolver';
import { AddReviewComponent } from '@app/shared/add-review';
import { AddReviewResolver, ListReviewComponent, ListReviewResolver } from '@app/pages/profile/list-review';
import {
  DropShipListResolver,
  DropShipListsComponent, SavedCatalogComponent,
  SavedCatalogListComponent, SavedCatalogListResolver, SavedCatalogResolver
} from "@app/pages/profile/drop-shipping";


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [authentication.AuthenticationGuard],
    children: [
      {
        path: '',
        component: UserProfileComponent,
        resolve: {
          profile: CurrentProfileResolver,
          verify: EmailVerifyResolver
        }
      },
      {
        path: 'edit',
        component: EditProfileComponent,
        resolve: {
          genders: GenderResolver,
          profile: CurrentProfileResolver
        }
      },
      {
        path: 'addresses',
        component: ListAddressComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          page: AddressListResolver,
        }
      },
      {path: 'change-password', component: ChangePasswordComponent},
      {
        path: 'list-wishlist',
        component: ListWishlistComponent,
        resolve: {
          page: WishlistListResolver,
        },
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'orders',
        component: OrderHistoryListComponent,
        resolve: {
          page: OrderListResolver,
          status: OrderStatusResolver,
        },
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'orders/:orderNumber',
        component: OrderDetailsComponent,
        resolve: {
          order: OrderResolver,
          status: OrderStatusResolver,
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'orders/:orderNumber/:productSlug/:warehouse',
        component: AddReviewComponent,
        resolve: {
          order: OrderProfileResolver
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'payments',
        component: PaymentComponent,
        resolve: {
          page: PaymentResolver,
        },
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'list-review',
        component: ListReviewComponent,
        resolve: {
          orderReviews: ListReviewResolver
        },
        runGuardsAndResolvers:  'always'
      },
      {
        path: 'list-review/add-review',
        component: AddReviewComponent,
        resolve: {
          order: AddReviewResolver
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'drop-shipping',
        component: DropShipListsComponent,
        resolve: {resellerCatalog: DropShipListResolver},
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'saved-catalog',
        children: [
          {
            path: '',
            component: SavedCatalogListComponent,
            resolve: {page: SavedCatalogListResolver},
            runGuardsAndResolvers: 'always'
          },
          {
            path: ':id',
            component: SavedCatalogComponent,
            resolve: { entity:  SavedCatalogResolver },
            runGuardsAndResolvers: 'always'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}

