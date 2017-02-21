import {Map} from 'immutable';
import {authActions} from './actions';

export function authReducer(state = new Map(), action) {

  if (!authActions.hasOwnProperty(action.type)) {
    return state;
  }

  const {payload, type} = action;

  switch (type) {
    case authActions.FETCH_AUTH_PENDING:
      return state.set('isPending', true);

    case authActions.FETCH_AUTH_FAILED:
      return state.set('isPending', false);

    case authActions.FETCH_AUTH_FULFILLED:
      return state.merge({
        ...payload.result.data,
        accesstoken: payload.param.accesstoken,
        isPending: false
      });

    case authActions.LOGOUT:
      return new Map();

    default:
      return state;
  }

}