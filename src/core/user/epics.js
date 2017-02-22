import {normalize} from 'normalizr';

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
    .map(({payload: {result}}) => {
      const data = result.data.data;
console.log(normalize(data, userSchema))
      return dbActions.mergeDeep(normalize(data, userSchema).entities);
    });
}

export const userEpics = [
  loadUser,
  fetchUserFulfilled
];