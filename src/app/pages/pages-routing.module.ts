import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import * as store from './store';
import {FocusedLayoutComponent, MainLayoutComponent} from '@app/layouts';
import {OrderSummaryComponent} from "@app/pages/order-summary";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
      {path: 'profile', loadChildren: () => import('./profile').then(m => m.ProfileModule)},
      {
        path: 'store',
        runGuardsAndResolvers: 'always',
        children: [
          {
            path: '',
            component: store.ChangeStoreComponent,
            resolve: {stores: store.AllStoresResolver},
            runGuardsAndResolvers: 'always',
          },
          {
            path: ':current-state',
            component: store.ChangeStoreComponent,
            resolve: {stores: store.AllStoresResolver},
            runGuardsAndResolvers: 'always',
          },
        ]
      },
      {path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
      {path: 'brand', loadChildren: () => import('./brand-detail/brand-detail.module').then(m => m.BrandDetailModule)},
      {path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
      {path: 'errors', loadChildren: () => import('./errors').then(m => m.ErrorsModule)},
      {path: 'page', loadChildren: () => import('./page/page.module').then(m => m.PageModule)},
      {path: 'promo', loadChildren: () => import('./promotion/promotion.module').then(m => m.PromotionModule)},
      {path: 'drop-shipping', loadChildren: () => import('./drop-shipping/drop-shipping.module').then(m => m.DropShippingModule)},
      {
        path: 'auth-confirm',
        loadChildren: () => import('./auth-confirm/auth-confirm.module').then(m => m.AuthConfirmModule)
      },
    ]
  },
  {
    path: '',
    component: FocusedLayoutComponent,
    runGuardsAndResolvers: 'always',
    children: [
      {path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)},
      {path: 'order-summary',  loadChildren: () => import('./order-summary/order-summary.module').then(m => m.OrderSummaryModule)},
      {path: 'order-confirm',  loadChildren: () => import('./order-confirm/order-confirm.module').then(m => m.OrderConfirmModule)},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
