import { ProductDetail } from '@app/models/product-detail';
import { Cart, CartDiscounts, CartProduct } from '@app/models/cart';

export interface AnalyticInterface {
  pageView(title: string, url: string, reset?: boolean): void;
  resetDataLayer(): void;
  trackView(product: ProductDetail): void;
  trackListView(products: ProductDetail[], list: string): void;
  trackListClick(product: ProductDetail): void;
  trackAddToCart(product: ProductDetail, qty: number): void;
  trackRemoveFromCart(product: CartProduct, quantity?: number): void;

  trackStartCheckout(cart: Cart, cartDiscounts: Array<CartDiscounts>): void;
  trackPurchase(): void;

  // auth
  login(method: 'email' | 'google' | 'facebook'): void;
  signup(method: 'email' | 'google' | 'facebook'): void;
}
