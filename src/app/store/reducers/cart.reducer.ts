import CartState, {initializeState} from '@app/store/state/cart.state';
import {Action, createReducer, on} from '@ngrx/store';
import * as CartActions from '@app/store/actions/cart.action';

export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(CartActions.GetCart, state => state),
  on(CartActions.SuccessGetCart, (state: CartState, {payload}) => {
    return {...state, Cart: payload};
  })
);

export function CartReducer(state: CartState | undefined, action: Action): CartState {
  return reducer(state, action);
}
