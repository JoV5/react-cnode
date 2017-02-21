import {authActions} from './actions';
import {postLogin} from '../../core/api';
import {localStoreActions} from '../localstore';

export function login(action$) {
  return action$.ofType(authActions.LOGIN)
    .switchMap(({payload}) => postLogin(payload));
}

export function fetchAuthFulFilled(action$, store) {
  return action$.ofType(authActions.FETCH_AUTH_FULFILLED)
    .map((action) => {
    console.log(action)
     return localStoreActions.saveToLocal('auth', store.getState().auth.toJS())
    });
}

export function logout(actions$) {
  return actions$.ofType(authActions.LOGOUT)
    .map(() => localStoreActions.deleteLocal('auth'));
}

export const authEpics = [
  login,
  logout,
  fetchAuthFulFilled
];