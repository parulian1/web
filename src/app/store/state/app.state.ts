import * as auth from '@app/store/reducers/auth.reducers';
import * as email from '@app/store/reducers/email.reducer';
import * as cart from '@app/store/reducers/cart.reducer';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.authReducer,
  email: email.emailReducer,
  cart: cart.CartReducer
};



