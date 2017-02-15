import {Map} from 'immutable';
import {userActions} from './actions';

export function userReducer(state = new Map(), action) {

  const {payload, type} = action;

  switch (type) {
    case userActions.FETCH_USER_PENDING:
      return state.set('isPending', true);

    case userActions.FETCH_USER_FAILED:
      return state.set('isPending', false);

    case userActions.FETCH_USER_FULFILLED:
      return state.merge({
        ...payload.result.data,
        accesstoken: payload.param.accesstoken,
        isPending: false
      });

    default:
      return state;
  }
}