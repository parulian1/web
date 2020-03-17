import * as auth from '@app/store/reducers/auth.reducers';
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {State} from "@app/store/reducers/auth.reducers";

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.authReducer
};

export const selectFeature = (state: AppState) => state.authState;

export const selectFeatureCount = createSelector(
  selectFeature,
  (state: auth.State) => state.user
);



