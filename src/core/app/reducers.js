import {Map} from 'immutable';
import {appActions} from './actions';

const AppState = {
  appNavIsShow: true
};

export function appReducer(state = new Map(AppState), action) {

  const {payload} = action;

  switch (action.type) {
    case appActions.TOGGLE_APP_NAV:
      return state.set('appNavIsShow', payload);
      
    case appActions.SAVE_HISTORY:
      return state.set('history', payload);

    default:
      return state;
  }
}