import {Store} from "@app/models/store/store";

export default class WarehouseState {
  currentWarehouse: Store;
}

export const initializeState = (): WarehouseState => {
  return {
    currentWarehouse: null
  };
};
