import {List} from 'immutable';
import {userActions} from './actions';

export function userReducer(state = new List(), action) {

  if (!userActions.hasOwnProperty(action.type)) {
    return state;
  }

  const {payload: {param, result}, type} = action;

  if (param) {
    const findIndexByLoginName = (loginname) =>
      state.findIndex((data) => {
        return data.loginname === loginname
      });
    const findedIndex = findIndexByLoginName(param.loginname);

    switch (type) {
      case userActions.FETCH_USER_PENDING:

        if (findedIndex > -1) {
          return state.set(findedIndex, {
            isPending: true,
            loginname: param.loginname
          });
        } else {
          return state.push({
            isPending: true,
            loginname: param.loginname
          });
        }

      case userActions.FETCH_USER_FAILED:

        if (findedIndex > -1) {
          return state.set(findedIndex, {
            isPending: false
          });
        }
        return state;

      case userActions.FETCH_USER_FULFILLED:

        if (findedIndex > -1) {
          return state.set(findedIndex, {
            ...result.data.data,
            isPending: false
          });
        }
        return state;

      default:
        return state;
    }
  }

  return state;

}