export const userActions = {
  FETCH_USER_FAILED: 'FETCH_USER_FAILED',
  FETCH_USER_PENDING: 'FETCH_USER_PENDING',
  FETCH_USER_FULFILLED: 'FETCH_USER_FULFILLED',

  LOAD_USER: 'LOAD_USER',

  fetchUserFailed: result => ({
    type: userActions.FETCH_USER_FAILED,
    payload: result
  }),

  fetchUserFulfilled: result => ({
    type: userActions.FETCH_USER_FULFILLED,
    payload: result
  }),

  fetchUserPending: param => ({
    type: userActions.FETCH_USER_PENDING,
    payload: param
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