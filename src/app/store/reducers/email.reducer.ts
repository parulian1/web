import {initialState, State} from '@app/store/reducers/auth.reducers';
import {AllEmail, EmailActionTypes} from '@app/store/actions/email.actions';

export function emailReducer(state = initialState, action: AllEmail): State {
  switch (action.type) {
    case EmailActionTypes.VERIFY_SENT:
      return {
        ...state,
        notification: {
          type: 'email-verification',
          message: action.payload.message.message
        }
      };
    default: {
      return state;
    }
  }
}

