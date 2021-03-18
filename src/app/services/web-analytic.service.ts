import { Injectable } from '@angular/core';
import { ProductDetail } from '@app/models/product-detail';
import { Cart, CartProduct } from '@app/models/cart';
import { AnalyticGtmService } from '@app/services/web-analytic';
import { WebAnalyticService as AnalyticService } from '@app/shared/web-analytic/providers/web-analytic.service';
import { ILoginEvent, ISignUpEvent } from '@app/shared/web-analytic/schemas/events';
import { AnalyticAction } from '@app/shared/web-analytic/schemas/analytic-action';

@Injectable({
  providedIn: 'root'
})
export class WebAnalyticService {
  constructor(
    private gtmService: AnalyticGtmService,
    private analyticService: AnalyticService,
  ) { }

  public pageView(title: string, url: string, reset=true) {
    this.gtmService.pageView(title, url, reset);
  }

  public resetDataLayer() {
    this.gtmService.resetDataLayer();
  }

  public trackView(product: ProductDetail) {
    this.gtmService.trackView(product);
  }

  public trackListView(products: Array<ProductDetail>, list: string = 'search') {
    this.gtmService.trackListView(products, list);
  }

  public trackListClick(product: ProductDetail) {
    this.gtmService.trackListClick(product);
  }

  public trackAddToCart(product: ProductDetail, qty = 1) {
    this.gtmService.trackAddToCart(product, qty);
  }

  public trackRemoveFromCart(product: CartProduct, qty = 1) {
    this.gtmService.trackRemoveFromCart(product, qty);
  }

  public trackStartCheckout(cart: Cart) {
    this.gtmService.trackStartCheckout(cart, cart.cartDiscounts);
  }

  public trackPurchase() {
    this.gtmService.trackPurchase();
  }

  // authentication
  login(method: 'email' | 'google' | 'facebook'): void {
    this.analyticService.event<ILoginEvent>(AnalyticAction.LOGIN, {
      method,
    });
  }
  signup(method: 'email' | 'google' | 'facebook'): void {
    this.analyticService.event<ISignUpEvent>(AnalyticAction.SIGN_UP, {
      method,
    })
  }
}
