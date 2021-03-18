import { Injectable } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { ProductDetail } from '@app/models/product-detail';
import { getSlugFromHref } from '@app/shared/helpers';
import { Cart, CartDiscounts, CartProduct } from '@app/models/cart';
import { AnalyticInterface } from '@app/services/web-analytic/analytic.interface';
// import {GaActionEnum, GoogleAnalyticsService} from 'ngx-google-analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticGaService implements AnalyticInterface {
  constructor(
    private gtmService: GoogleTagManagerService
  ) { }

  public pageView(title: string, url: string, reset=true) {
    if (reset) {
      this.resetDataLayer();
    }
    this.gtmService.pushTag({
      'event': 'pageview',
      'pageName': title,
      'pageUrl': url,
    })
  }

  public resetDataLayer() {
    this.gtmService.pushTag(function() {
      this.reset();
    })
  }

  public trackView(product: ProductDetail) {
    this.gtmService.pushTag(
      {
        'event': 'view_item',
        'ecommerce': {
          'items': [{
            'item_name': product.name,
            'item_id': getSlugFromHref(product.href),
            // 'price': '33.75',
            'item_brand': product.vendor?.name,
            'item_category': product.category?.name,
            // 'item_variant': 'Black',
            // 'item_list_name': 'Search Results',  // If associated with a list selection.
            // 'item_list_id': 'SR123',  // If associated with a list selection.
            // 'index': 1,  // If associated with a list selection.
            // 'quantity': '1'
          }],
          'detail': {
            // 'actionField': {'list': 'Apparel Gallery'},    // 'detail' actions have an optional list property.
            'products': [{
              'name': product.name,         // Name or ID is required.
              'id': getSlugFromHref(product.href),
              // 'price': '15.25',
              'brand': product.vendor?.name,
              'category': product.category?.name,
              // 'variant': 'Gray'
            }]
          }
        }
      }
    )
  }

  public trackListView(products: Array<ProductDetail>, list: string = 'search') {
    let itemList: Array<any> = [];
    let oldItemList : Array<any> = [];
    let i = 0;
    for (let product of products) {
      i++;
      itemList.push({
        'item_name': product.name,
        'item_id': getSlugFromHref(product.href),
        // 'price': '33.75',
        'item_brand': product.vendor?.name || '',
        'item_category': product.category?.name || '',
        // 'item_variant': 'Black',
        'item_list_name': list,  // If associated with a list selection.
        // 'item_list_id': 'SR123',  // If associated with a list selection.
        'index': i,  // If associated with a list selection.
        // 'quantity': '1'
      })
      oldItemList.push(
        {
          'name': product.name,       // Name or ID is required.
          'id': getSlugFromHref(product.href),
          // 'price': '15.25',
          'brand': product.vendor?.name || '',
          'category': product.category?.name || '',
          // 'variant': 'Gray',
          'list': list,
          'position': i,
        },
      )
    }
    this.gtmService.pushTag({
      'event': 'view_item_list',
      'ecommerce': {
        'items': itemList,
        'impressions': oldItemList,
      }
    });
  }

  public trackListClick(product: ProductDetail) {
    this.gtmService.pushTag({
      'event': 'select_item',
      'ecommerce': {
        'items': [{
          'item_name': product.name, // Name or ID is required.
          'item_id': getSlugFromHref(product.href),
          'item_brand': product.vendor?.name,
          'item_category': product.category?.name,
          // 'item_variant': productObj.variant,
          // 'item_list_name': productObj.list_name,
          // 'item_list_id': productObj.list_id,
          // 'index': productObj.index,
          // 'quantity': productObj.quantity,
          // 'price': productObj.price
        }]
      }
    });
    this.gtmService.pushTag({
      'event': 'productClick',
      'ecommerce': {
        'click': {
          // 'actionField': {'list': 'Search Results'},      // Optional list property.
          'products': [{
            'name': product.name,                     // Name or ID is required.
            'id': getSlugFromHref(product.href),
            // 'price': productObj.price,
            'brand': product.vendor?.name,
            'category':  product.category?.name,
            // 'variant': productObj.variant,
            // 'position': productObj.position
          }]
        }
      },
      // 'eventCallback': function() {
      //   document.location = productObj.url
      // }
    })
  }

  public trackAddToCart(product: ProductDetail, qty = 1) {
    this.gtmService.pushTag({
      'event': 'add_to_cart',
      'ecommerce': {
        'items': [{
          'item_name': product.name, // Name or ID is required.
          'item_id': getSlugFromHref(product.href),
          'item_brand': product.vendor?.name,
          'item_category': product.category?.name,
          // 'price': '33.75',
          'index': null,
          'quantity': qty,
          // 'item_variant': 'Black',
          // 'item_list_name': 'Search Results',
          // 'item_list_id': 'SR123',
        }]
      }
    })
  }

  public trackRemoveFromCart(product: CartProduct, qty = 1) {
    this.gtmService.pushTag({
      'event': 'remove_from_cart',
      'ecommerce': {
        'items': [{
          'item_name': product.name, // Name or ID is required.
          'item_id': getSlugFromHref(product.href),
          'item_brand': product.brand?.name,
          'item_category': null,
          // 'price': '33.75',

          // 'item_variant': 'Black',
          // 'item_list_name': 'Search Results',  // If associated with a list selection.
          // 'item_list_id': 'SR123',  // If associated with a list selection.
          // 'index': 1,  // If associated with a list selection.
          'quantity': qty
        }]
      }
    })
  }

  public trackStartCheckout(cart: Cart, cartDiscounts: Array<CartDiscounts>): void {
    let itemize = [];
    for (const item of cart.cartItems) {
      itemize.push({
        'item_name': item.product?.name, // Name or ID is required.
        'item_id': getSlugFromHref(item.product?.href),
        'item_brand': item.product?.brand?.name,
        'item_category': null,
        // 'price': '33.75',
        // 'item_variant': 'Black',
        'item_list_name': null,
        'item_list_id': null,
        'index': null,
        'quantity': item.quantity
      })
    }
    this.gtmService.pushTag({
      'event': 'begin_checkout',
      'ecommerce': {
        'items': itemize
      }
    })
  }

  public trackPurchase() {
    this.gtmService.pushTag({
      'event': 'purchase',
      'ecommerce': {
        'purchase': {
          'transaction_id': 'T12345',
          'affiliation': 'Online Store',
          'value': '35.43',
          'tax': '4.90',
          'shipping': '5.99',
          'currency': 'EUR',
          'coupon': 'SUMMER_SALE',
          'items': [{
            'item_name': 'Triblend Android T-Shirt',
            'item_id': '12345',
            'item_price': '15.25',
            'item_brand': 'Google',
            'item_category': 'Apparel',
            'item_variant': 'Gray',
            'quantity': 1,
            'item_coupon': ''
          }, {
            'item_name': 'Donut Friday Scented T-Shirt',
            'item_id': '67890',
            'item_price': '33.75',
            'item_brand': 'Google',
            'item_category': 'Apparel',
            'item_variant': 'Black',
            'quantity': 1
          }]
        }
      }
    })
  }

  // authentication
  login(method: 'email' | 'google' | 'facebook'): void {
    this.gtmService.pushTag({
      event: 'login', method,
    })
  }
  signup(method: "email" | "google" | "facebook"): void {
    this.gtmService.pushTag({
      event: 'sign_up', method,
    })
  }
}
