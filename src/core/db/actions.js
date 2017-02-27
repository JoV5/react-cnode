export const dbActions = {
  DB_MERGE_DEEP: 'DB_MERGE_DEEP',
  DB_MARK_MESSAGE: 'DB_MARK_MESSAGE',
  DB_UPDATE_REPLY_UP: 'DB_UPDATE_REPLY_UP',

  mergeDeep: data => ({
    type: dbActions.DB_MERGE_DEEP,
    payload: data
  }),

  markMessage: (result) => ({
    type: dbActions.DB_MARK_MESSAGE,
    payload: result
  }),

  updateReplyUp: (replyid, userid, action) => ({
    type: dbActions.DB_UPDATE_REPLY_UP,
    payload: {
      replyid,
      userid,
      action
    }
  })
};