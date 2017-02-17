export const topicActions = {
  FETCH_TOPIC_FAILED: 'FETCH_TOPIC_FAILED',
  FETCH_TOPIC_PENDING: 'FETCH_TOPIC_PENDING',
  FETCH_TOPIC_FULFILLED: 'FETCH_TOPIC_FULFILLED',

  LOAD_TOPICS: 'LOAD_TOPICS',
  LOAD_TOPIC: 'LOAD_TOPIC',

  UPDATE_REPLY_UP: 'UPDATE_REPLY_UP',

  fetchTopicFailed: result => ({
    type: topicActions.FETCH_TOPIC_FAILED,
    payload: result
  }),

  fetchTopicFulfilled: result => ({
    type: topicActions.FETCH_TOPIC_FULFILLED,
    payload: result
  }),

  fetchTopicPending: param => ({
    type: topicActions.FETCH_TOPIC_PENDING,
    payload: param
  }),

  loadTopics: param => ({
    type: topicActions.LOAD_TOPICS,
    payload: param
  }),

  loadTopic: param => ({
    type: topicActions.LOAD_TOPIC,
    payload: param
  }),

  updateReplyUp: (topicid, replyid, userid, action) => ({
    type: topicActions.UPDATE_REPLY_UP,
    payload: {
      topicid,
      replyid,
      userid,
      action
    }
  })
};

export const topicRequestAction = {
  failed: topicActions.fetchTopicFailed,
  fulfilled: topicActions.fetchTopicFulfilled,
  pending: topicActions.fetchTopicPending
};