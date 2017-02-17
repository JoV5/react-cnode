export const userActions = {
  FETCH_USER_FAILED: 'FETCH_USER_FAILED',
  FETCH_USER_PENDING: 'FETCH_USER_PENDING',
  FETCH_USER_FULFILLED: 'FETCH_USER_FULFILLED',

  POST_LOGIN: 'POST_LOGIN',
  LOGOUT: 'LOGOUT',
  LOAD_USER: 'LOAD_USER',

  fetchUserFailed: result => ({
    type: userActions.FETCH_USER_FAILED,
    payload: result
  }),

  fetchUserFulfilled: result => ({
    type: userActions.FETCH_USER_FULFILLED,
    payload: result
  }),

  fetchUserPending: result => ({
    type: userActions.FETCH_USER_PENDING,
    payload: result
  }),

  postLogin: param => ({
    type: userActions.POST_LOGIN,
    payload: param
  }),

  logout: () => ({
    type: userActions.LOGOUT
  }),

  loadUser: param => ({
    type: userActions.LOAD_USER,
    payload: param
  })
};

export const userRequestAction = {
  failed: userActions.fetchUserFailed,
  fulfilled: userActions.fetchUserFulfilled,
  pending: userActions.fetchUserPending
};