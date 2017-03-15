export const replyActions = {
  FETCH_REPLY_FAILED: 'FETCH_REPLY_FAILED',
  FETCH_REPLY_PENDING: 'FETCH_REPLY_PENDING',
  FETCH_REPLY_FULFILLED: 'FETCH_REPLY_FULFILLED',

  REPLY_UP: 'REPLY_UP',
  TOGGLE_REPLY_BOX: 'TOGGLE_REPLY_BOX',
  POST_REPLY: 'POST_REPLY',

  fetchReplyFailed: result => ({
    type: replyActions.FETCH_REPLY_FAILED,
    payload: result
  }),

  fetchReplyFulfilled: result => ({
    type: replyActions.FETCH_REPLY_FULFILLED,
    payload: result
  }),

  fetchReplyPending: param => ({
    type: replyActions.FETCH_REPLY_PENDING,
    payload: param
  }),

  replyUp: param => ({
    type: replyActions.REPLY_UP,
    payload: param
  }),

  toggleReplyBox: param => ({
    type: replyActions.TOGGLE_REPLY_BOX,
    payload: param
  }),
  
  postReply: param => ({
    type: replyActions.POST_REPLY,
    payload: param
  })
};

export const replyRequestActions = {
  failed: replyActions.fetchReplyFailed,
  fulfilled: replyActions.fetchReplyFulfilled,
  pending: replyActions.fetchReplyPending
};