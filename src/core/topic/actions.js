export const topicActions = {
  FETCH_TOPIC_FAILED: 'FETCH_TOPIC_FAILED',
  FETCH_TOPIC_PENDING: 'FETCH_TOPIC_PENDING',
  FETCH_TOPIC_FULFILLED: 'FETCH_TOPIC_FULFILLED',
  CANCEL_LOAD_TOPIC: 'CANCEL_LOAD_TOPIC',

  LOAD_TOPICS: 'LOAD_TOPICS',
  POST_TOPIC: 'POST_TOPIC',
  LOAD_TOPIC: 'LOAD_TOPIC',

  TOPICS_SAVE_SCROLL_TOP: 'TOPICS_SAVE_SCROLL_TOP',
  SAVE_SELECTED_TAB: 'SAVE_SELECTED_TAB',

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
  
  postTopic: param => ({
    type: topicActions.POST_TOPIC,
    payload: param
  }),

  cancelLoadTopic: () => ({
    type: topicActions.CANCEL_LOAD_TOPIC
  }),

  saveScrollTop: (tab, scrollTop) => ({
    type: topicActions.TOPICS_SAVE_SCROLL_TOP,
    payload: {
      tab,
      scrollTop
    }
  }),

  saveSelectedTab: (tab) => ({
    type: topicActions.SAVE_SELECTED_TAB,
    payload: tab
  })
};

export const topicRequestActions = {
  failed: topicActions.fetchTopicFailed,
  fulfilled: topicActions.fetchTopicFulfilled,
  pending: topicActions.fetchTopicPending
};