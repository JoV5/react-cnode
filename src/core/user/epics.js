import {userActions} from './actions';
import {fetchUser} from '../../core/api';

export function loadUser(action$) {
  return action$.ofType(userActions.LOAD_USER)
    .switchMap(({payload}) => fetchUser(payload));
}

export const userEpics = [
  loadUser
];