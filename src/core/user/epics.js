import {userActions} from './actions';
import {postLogin as postLoginApi, fetchUser} from '../../core/api';

export function postLogin(action$) {
  return action$.ofType(userActions.POST_LOGIN)
    .switchMap(({payload}) => {
      return postLoginApi(payload)
    })
}

export function loadUser(action$) {
  return action$.ofType(userActions.LOAD_USER)
    .switchMap(({payload}) => {
      return fetchUser(payload)
    })
}

export const userEpics = [
  postLogin,
  loadUser
];