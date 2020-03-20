import {User} from "@app/models/user";
import {All, AuthActionTypes} from "@app/store/actions/auth.actions";
import {createSelector} from "@ngrx/store";

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function authReducer (state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
          isAuthenticated: true,
          isEmailVerified: false
        },
        errorMessage: null
      }
    }
    case AuthActionTypes.REGISTER_FAILED: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: action.payload.error.error.message
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

// export const selectFeature = (state: AppState) => state.authState;
//
// export const selectFeatureCount = createSelector(
//   selectFeature,
//   (state: State) => state.user
// );

// export const selectFeature = createFeatureSelector<AppState, State>('auth');
//
// export const selectFeatureCount = createSelector(
//   selectFeature,
//   (state: State) => state.user
// );

export const selectAuthState = createSelector((state: State) => state.user, value => value);
