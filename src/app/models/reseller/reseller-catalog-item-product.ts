import {CartProduct, CartVendor, UnitPrice} from "@app/models/cart";
import {NamedHrefEntity} from "@app/models/base";
import {ProductDetailMedia} from "@app/models/product-detail";

export interface ResellerCatalogItemProduct extends NamedHrefEntity {
  description?: string;
  upc?: string;
  brand?: CartVendor;
  unitPrice?: UnitPrice;
  media?: Array<ProductDetailMedia>;
  attributes?: any;
  weight?: number;
}
