import {appActions} from './actions';

const DefaultState = {
  appNavIsShow: false
};

export function appReducer(state = DefaultState, action) {

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