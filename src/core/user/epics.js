import {userActions} from './actions';
import {postLogin as postLoginApi} from '../../core/api';

export function postLogin(action$) {
  return action$.ofType(userActions.POST_LOGIN)
    .switchMap(({payload}) => {
      return postLoginApi(payload)
    })
}

export const userEpics = [
  postLogin
];