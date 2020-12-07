import {StoreType} from "./store.type";
import {Address} from "./address";

/**
 * A location where products may be purchased
 * and/or shipped from.
 */
export interface Store {
  href: string;
  name: string;
  code: string;
  type: StoreType;
  address: Address;
}
