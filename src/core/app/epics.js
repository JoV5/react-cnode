import {appActions} from './actions';
import {messageActions} from '../../core/message';

// 在每次显示AppNav的时候更新消息未读数
export function toggleAppNav(action$, state) {
  return action$.ofType(appActions.TOGGLE_APP_NAV)
    .filter(({payload}) => payload)
    .map(() => state.getState().auth.get('accesstoken'))
    .filter((accesstoken) => !!accesstoken)
    .map((accesstoken) => messageActions.loadMessageCount({
      accesstoken: accesstoken
    }));
}

export const appEpics = [
  toggleAppNav
];