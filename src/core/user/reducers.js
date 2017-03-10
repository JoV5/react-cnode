import {fromJS} from 'immutable';
import {userActions} from './actions';

const UserState = {
  isPendingUser: false
};

export function userReducer(state = fromJS(UserState), action) {

  if (!userActions.hasOwnProperty(action.type)) {
    return state;
  }

  const {type} = action;

  switch (type) {
    case userActions.FETCH_USER_PENDING:
      return state.set('isPendingUser', true);

    case userActions.FETCH_USER_FAILED:
    case userActions.USER_FETCHED_TO_DB:
      return state.set('isPendingUser', false);

    default:
      return state;
  }

}