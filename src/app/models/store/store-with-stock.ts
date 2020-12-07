import { Store } from "@app/models/store/store";

export interface StoreWithStock extends Store {
  quantity?: number;
}
