import Immutable from 'immutable';
import {userActions} from './actions';

export const UserState = {
  me: {},
  data: []
};

export function userReducer(state = Immutable.fromJS(UserState), action) {

  const {payload, type} = action;

  switch (type) {
    case userActions.FETCH_USER_PENDING:
      return state.set('isPending', true);

    case userActions.FETCH_USER_FAILED:
      return state.set('isPending', false);

    case userActions.FETCH_USER_FULFILLED:
      if (payload.type === 'login') {
        return state.merge({
          me: {
            ...payload.result.data,
            accesstoken: payload.param.accesstoken,
            isPending: false
          }
        });
      } else if (payload.type === 'user') {
        return state.merge({
          data: state.get('data').push({
            ...payload.result.data.data
          })
        });
      }

      return state;

    default:
      return state;
  }
}