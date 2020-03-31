import * as auth from '@app/store/reducers/auth.reducers';
import * as email from '@app/store/reducers/email.reducer';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.authReducer,
  email: email.emailReducer
};



