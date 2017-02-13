export const appActions = {

  TOGGLE_APP_NAV: 'TOGGLE_APP_NAV',

  toggleAppNav: bool => ({
    type: appActions.TOGGLE_APP_NAV,
    payload: bool
  })
};