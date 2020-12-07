import {createAction, props} from '@ngrx/store';
import {Cart} from '@app/models/cart';

export const GetCart = createAction('[Cart] - Get Cart');

export const SuccessGetCart = createAction(
  '[Cart] - Success Get Cart',
  props<{ payload: Cart }>()
);
