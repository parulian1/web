import {Cart} from '@app/models/cart';

export default class CartState {
  Cart: Cart;
}

export const initializeState = (): CartState => {
  return {
    Cart: null
  };
};
