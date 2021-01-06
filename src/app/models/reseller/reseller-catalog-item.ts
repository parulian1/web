import { ResellerCatalogItemProduct } from "@app/models/reseller/reseller-catalog-item-product";
import { ResellerCatalogItemWarehouse } from "@app/models/reseller/reseller-catalog-item-warehouse";

export interface ResellerCatalogItem {
  quantity: number;
  href?: string;
  product: ResellerCatalogItemProduct;
  warehouse: ResellerCatalogItemWarehouse;
  price: number;
  availableStock?: number;
}


