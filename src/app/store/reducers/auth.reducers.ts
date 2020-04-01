import {All, AuthActionTypes} from "@app/store/actions/auth.actions";
import {Credentials} from "@app/models/credentials";
import {Notification} from "@app/models/notification";

export interface State {
  credentials: Credentials,
  notification: Notification
}

export const initialState: State = {
  credentials: null,
  notification: null
};

export function authReducer (state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
      }
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
      }
    }
    case AuthActionTypes.REGISTER_FAILED: {
      return {
        ...state,
      }
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
