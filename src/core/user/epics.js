import {normalize} from 'normalizr';
import {Observable} from 'rxjs/Observable';

import {userActions} from './actions';
import {fetchUser} from '../../core/api';
import {userSchema} from './schemas';
import {dbActions} from '../db';

export function loadUser(action$) {
  return action$.ofType(userActions.LOAD_USER)
    .switchMap(({payload}) => fetchUser(payload));
}

export function fetchUserFulfilled(action$) {
  return action$.ofType(userActions.FETCH_USER_FULFILLED)
    .switchMap(({payload: {result}}) => {
      const data = result.data.data;

      return Observable.merge(
        Observable.of(dbActions.mergeDeep(normalize(data, userSchema).entities)),
        Observable.of(userActions.userFetchToDB())
      );
    });
}

export const userEpics = [
  loadUser,
  fetchUserFulfilled
];