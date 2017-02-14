export const topicActions = {
  FETCH_TOPIC_FAILED: 'FETCH_TOPIC_FAILED',
  FETCH_TOPIC_PENDING: 'FETCH_TOPIC_PENDING',
  FETCH_TOPIC_FULFILLED: 'FETCH_TOPIC_FULFILLED',

  LOAD_TOPIC: 'LOAD_TOPIC',

  fetchTopicFailed: result => ({
    type: topicActions.FETCH_TOPIC_FAILED,
    payload: result
  }),

  fetchTopicFulfilled: result => ({
    type: topicActions.FETCH_TOPIC_FULFILLED,
    payload: result
  }),

  fetchTopicPending: result => ({
    type: topicActions.FETCH_TOPIC_PENDING,
    payload: result
  }),

  loadTopic: param => ({
    type: topicActions.LOAD_TOPIC,
    payload: param
  })
};

export const topicRequestAction = {
  failed: topicActions.fetchTopicFailed,
  fulfilled: topicActions.fetchTopicFulfilled,
  pending: topicActions.fetchTopicPending
};