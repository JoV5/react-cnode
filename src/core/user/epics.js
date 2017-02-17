import {userActions} from './actions';
import {postLogin as postLoginApi, fetchUser} from '../../core/api';
import {localStoreActions} from '../localstore';

export function postLogin(action$) {
  return action$.ofType(userActions.POST_LOGIN)
    .switchMap(({payload}) => postLoginApi(payload));
}

export function fetchUserFulFilled(action$, store) {
  return action$.ofType(userActions.FETCH_USER_FULFILLED)
    .filter(({payload: {type}}) => type === 'login')
    .map(() => localStoreActions.saveToLocal('me', store.getState().user.get('me').toJS()));
}

export function logout(actions$) {
  return actions$.ofType(userActions.LOGOUT)
    .map(() => localStoreActions.deleteLocal('me'));
}

export function loadUser(action$) {
  return action$.ofType(userActions.LOAD_USER)
    .switchMap(({payload}) => fetchUser(payload));
}

export const userEpics = [
  postLogin,
  logout,
  loadUser,
  fetchUserFulFilled
];