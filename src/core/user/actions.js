export const userActions = {
  FETCH_USER_FAILED: 'FETCH_USER_FAILED',
  FETCH_USER_PENDING: 'FETCH_USER_PENDING',
  FETCH_USER_FULFILLED: 'FETCH_USER_FULFILLED',
  USER_FETCHED_TO_DB: 'USER_FETCHED_TO_DB',

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
  }),

  userFetchToDB: () => ({
    type: userActions.USER_FETCHED_TO_DB
  })
};

export const userRequestActions = {
  failed: userActions.fetchUserFailed,
  fulfilled: userActions.fetchUserFulfilled,
  pending: userActions.fetchUserPending
};