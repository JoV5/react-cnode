import {appActions} from './actions';
import {messageActions} from '../../core/message';

export function toggleAppNav(action$, state) {
  return action$.ofType(appActions.TOGGLE_APP_NAV)
    .filter(({payload}) => payload)
    .map(() => state.getState().user.get('me').get('accesstoken'))
    .filter((accesstoken) => !!accesstoken)
    .map((accesstoken) => messageActions.loadMessageCount({
      accesstoken: accesstoken
    }));
}

export const appEpics = [
  toggleAppNav
];