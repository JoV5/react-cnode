export const appActions = {

  TOGGLE_APP_NAV: 'TOGGLE_APP_NAV',
  SAVE_HISTORY: 'SAVE_HISTORY',

  toggleAppNav: bool => ({
    type: appActions.TOGGLE_APP_NAV,
    payload: bool
  }),
  
  saveHistory: history => ({
    type: appActions.SAVE_HISTORY,
    payload: history
  })
};