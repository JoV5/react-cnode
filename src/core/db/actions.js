export const dbActions = {
  DB_MERGE_DEEP: 'DB_MERGE_DEEP',
  DB_MARK_MESSAGE: 'DB_MARK_MESSAGE',
  DB_UPDATE_REPLY_UP: 'DB_UPDATE_REPLY_UP',
  DB_UPDATE_REPLY: 'DB_UPDATE_REPLY',
  DB_UPDATE_USER_COLLECT: 'DB_UPDATE_USER_COLLECT',

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
  }),

  updateUserCollect: (loginname, topicid, isCollect) => ({
    type: dbActions.DB_UPDATE_USER_COLLECT,
    payload: {
      loginname,
      topicid,
      isCollect
    }
  }),
  
  updateReply: (topic_id, reply) => ({
    type: dbActions.DB_UPDATE_REPLY,
    payload: {
      topic_id,
      reply
    }
  })
};