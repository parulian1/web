import {PriceLists, ProductDetailMedia} from "@app/models/product-detail";
import {ProductPriceRange} from "@app/models/product-lists";

export class Cart {
  modified: string;
  cartTotals: CartTotals;
  cartDiscounts: Array<CartDiscounts>;
  cartItems: Array<LineItems>;
  weight: Array<CartWeight>;
}

export interface CartModified {
  cart: Cart;
  product: Array<ProductCart>;
}

export interface ProductCart {
  href: string;
  media: Array<ProductDetailMedia>;
  name: string;
  vendor: string;
  priceLists: Array<PriceLists>;
}

export interface CartWeight {
  href: string;
  name: string;
  postalCode: string;
  totalWeight: number;
}

export interface CartTotals {
  grandTotal: number;
  subTotal: number;
  taxTotal: number;
  shippingTotal?: number;
  discountTotal?: number;
}

export interface CartDiscounts {
  href: string;
  name: string;
  code?: string;
  discount?: number;
}

export interface LineItems {
  quantity: number;
  href: string;
  isInStock: boolean;
  lineTotals: LineTotals;
  tax: Tax;
  discount: Array<Discount>;
  product: CartProduct;
  warehouse: CartWarehouse;
}

export interface LineTotals {
  price: number;
  discount?: number;
}

export interface Tax {
  name: string;
  href: string;
}

export interface Discount {
  name: string;
  href: string;
}

export interface CartProduct {
  name: string;
  description: string;
  upc: string;
  brand: CartVendor;
  unitPrice: UnitPrice;
  media?: Array<ProductDetailMedia>;
  href: string;
}

export interface CartVendor {
  name: string;
  href: string;
}

export interface UnitPrice {
  current: number;
  regular: number;
}

export interface CartWarehouse {
  name: string;
  href: string;
}

