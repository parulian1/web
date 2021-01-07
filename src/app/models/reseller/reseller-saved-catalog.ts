import { HrefEntity } from "@app/models/base";
import { ResellerSavedCatalogItem } from "@app/models/reseller/reseller-saved-catalog-item";
import {ShippingCost} from "@app/models/shipping-method";

export interface ResellerSavedCatalog {
  name?: string;
  items: Array<ResellerSavedCatalogItem>;
  data?: ResellerSavedCatalogData;
  href?: string;
  pdf?: string;
}

export interface ResellerSavedCatalogData {
  savedAddress?: ResellerSavedCatalogAddress;
  savedShipmentMethods?: Array<ResellerSavedCatalogShipmentMethod>;
}

export interface ResellerSavedCatalogAddress {
  name?: string;
  shipToName?: string;
  street?: string;
  city?: string;
  district?: string;
  state?: string;
  zipCode?: string;
  phoneNumber?: string;
  href?: string;
  latitude?: number;
  longitude?: number;
}


export interface ResellerSavedCatalogShipmentMethod {
  method?: ShippingCost;
  warehouse: string;
  fullWarehouse?: string;
  status?: boolean;
}
