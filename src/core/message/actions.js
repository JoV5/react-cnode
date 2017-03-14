export const messageActions = {
  FETCH_MESSAGE_FAILED: 'FETCH_MESSAGE_FAILED',
  FETCH_MESSAGE_PENDING: 'FETCH_MESSAGE_PENDING',
  FETCH_MESSAGE_FULFILLED: 'FETCH_MESSAGE_FULFILLED',

  LOAD_MESSAGE_COUNT: 'LOAD_MESSAGE_COUNT',
  LOAD_MESSAGES: 'LOAD_MESSAGES',
  MARK_ALL_MESSAGE: 'MARK_ALL_MESSAGE',
  MESSAGES_SAVE_SCROLL_TOP: 'MESSAGES_SAVE_SCROLL_TOP',

  fetchMessageFailed: result => ({
    type: messageActions.FETCH_MESSAGE_FAILED,
    payload: result
  }),

  fetchMessageFulfilled: result => ({
    type: messageActions.FETCH_MESSAGE_FULFILLED,
    payload: result
  }),

  fetchMessagePending: param => ({
    type: messageActions.FETCH_MESSAGE_PENDING,
    payload: param
  }),

  loadMessageCount: param => ({
    type: messageActions.LOAD_MESSAGE_COUNT,
    payload: param
  }),

  loadMessages: param => ({
    type: messageActions.LOAD_MESSAGES,
    payload: param
  }),

  markAllMessage: param => ({
    type: messageActions.MARK_ALL_MESSAGE,
    payload: param
  }),

  saveScrollTop: (scrollTop) => ({
    type: messageActions.MESSAGES_SAVE_SCROLL_TOP,
    payload: scrollTop
  })
};

export const messageRequestActions = {
  failed: messageActions.fetchMessageFailed,
  fulfilled: messageActions.fetchMessageFulfilled,
  pending: messageActions.fetchMessagePending
};