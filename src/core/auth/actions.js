export const authActions = {
  FETCH_AUTH_FAILED: 'FETCH_AUTH_FAILED',
  FETCH_AUTH_PENDING: 'FETCH_AUTH_PENDING',
  FETCH_AUTH_FULFILLED: 'FETCH_AUTH_FULFILLED',

  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',

  fetchAuthFailed: result => ({
    type: authActions.FETCH_AUTH_FAILED,
    payload: result
  }),

  fetchAuthFulfilled: result => ({
    type: authActions.FETCH_AUTH_FULFILLED,
    payload: result
  }),

  fetchAuthPending: param => ({
    type: authActions.FETCH_AUTH_PENDING,
    payload: param
  }),

  login: param => ({
    type: authActions.LOGIN,
    payload: param
  }),

  logout: () => ({
    type: authActions.LOGOUT
  })
};

export const authRequestAction = {
  failed: authActions.fetchAuthFailed,
  fulfilled: authActions.fetchAuthFulfilled,
  pending: authActions.fetchAuthPending
};