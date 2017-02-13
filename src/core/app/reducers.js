import {appActions} from './actions';

const AppState = {
  appNavIsShow: false
};

export function appReducer(state = AppState, action) {

  const {payload} = action;

  switch (action.type) {
    case appActions.TOGGLE_APP_NAV:
      return {
        ...state,
        appNavIsShow: payload
      };
    default:
      return state;
  }
}