export const getStateApp = (state) => state.app;

export const getAppNavIsShow = (state) => getStateApp(state).get('appNavIsShow');