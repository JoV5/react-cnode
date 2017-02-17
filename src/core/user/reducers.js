import {fromJS} from 'immutable';
import {userActions} from './actions';

export const UserState = {
  me: {},
  list: []
};

export function userReducer(state = fromJS(UserState), action) {

  if (!userActions.hasOwnProperty(action.type)) {
    return state;
  }

  const {type} = action;


  if (action.payload) {
    const {payload: {type: payloadType, param, result}, type} = action;
    const userList = state.get('list');
    const findIndexByLoginName = (loginname) =>
      userList.findIndex((data) => {
        return data.loginname === loginname
      });

    switch (type) {
      case userActions.FETCH_USER_PENDING:
        if (payloadType === 'login') {
          return state.setIn(['me', 'isPending'], true);
        } else if (payloadType === 'user') {
          const findedIndex = findIndexByLoginName(param.loginname);

          if (findedIndex > -1) {
            return state.merge({
              list: userList.set(findedIndex, {
                isPending: true,
                loginname: param.loginname
              })
            });
          } else {
            return state.merge({
              list: state.get('list').push({
                isPending: true,
                loginname: param.loginname
              })
            });
          }
        }
        return state;
      case userActions.FETCH_USER_FAILED:
        if (payloadType === 'login') {
          return state.setIn(['me', 'isPending'], false);
        } else if (payloadType === 'user') {
          const findedIndex = findIndexByLoginName(param.loginname);

          if (findedIndex > -1) {
            return state.merge({
              list: userList.set(findedIndex, {
                isPending: false
              })
            });
          }
        }
        return state;
      case userActions.FETCH_USER_FULFILLED:
        if (payloadType === 'login') {
          return state.merge({
            me: {
              ...result.data,
              accesstoken: param.accesstoken,
              isPending: false
            }
          });
        } else if (payloadType === 'user') {
          const findedIndex = findIndexByLoginName(param.loginname);

          if (findedIndex > -1) {
            return state.merge({
              list: state.get('list').set(findedIndex, {
                ...result.data.data,
                isPending: false
              })
            });
          }
        }
        return state;
      default:
        return state;
    }
  } else {
    switch (type) {
      case userActions.LOGOUT:
        return state.merge({
          me: {}
        });
      default:
        return state;
    }
  }
}