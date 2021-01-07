import { CartWarehouse } from "@app/models/cart";

export interface ResellerCatalogItemWarehouse extends CartWarehouse {
  postalCode?: string;
}
