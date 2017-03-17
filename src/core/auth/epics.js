import {Observable} from 'rxjs/Observable';
import {normalize} from 'normalizr';

import {authActions} from './actions';
import {postLogin} from '../api';
import {localStoreActions} from '../localstore';
import {dbActions} from '../db';
import {userSchema} from '../user';

export function login(action$) {
  return action$.ofType(authActions.LOGIN)
    .switchMap(({payload}) => postLogin(payload));
}

// 登陆成功后进行本地保存
export function fetchAuthFulFilled(action$) {
  return action$.ofType(authActions.FETCH_AUTH_FULFILLED)
    .switchMap(({payload: {result: {data}, param: {accesstoken}}}) => {
      const userMe = {
        ...data,
        accesstoken
      };

      return Observable.merge(
        Observable.of(localStoreActions.saveToLocal('auth', userMe)),
        Observable.of(dbActions.mergeDeep(normalize(userMe, userSchema).entities)) // 保存登录用户至db
      )
    });
}

export function logout(actions$, {getState}) {
  return actions$.ofType(authActions.LOGOUT)
    .map(() => {
      const history = getState().app.get('history');
      const selectedTab = getState().topic.get('selectedTab');
      
      history.replace(`/topics/${selectedTab}`);
      
      return localStoreActions.deleteLocal('auth');
    });
}

export const authEpics = [
  login,
  logout,
  fetchAuthFulFilled
];