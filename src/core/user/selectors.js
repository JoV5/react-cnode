export const getMatchedUserName = (state, props) => props.match.params.loginname;

export const getStateUser = (state) => state.user;
export const getIsPendingUser = (state) => getStateUser(state).get('isPendingUser');