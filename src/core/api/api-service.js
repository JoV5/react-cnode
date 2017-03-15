import axios from 'axios';

import {
  API_TOPICS_URL,
  API_TOPICS_DEFAULT,
  API_TOPIC_URL,
  API_TOPIC_DEFAULT,
  API_LOGIN_URL,
  API_USER_URL,
  API_REPLY_UP_URL,
  API_MESSAGE_COUNT_URL,
  API_MESSAGES_URL,
  API_MESSAGES_DEFAULT,
  API_MESSAGE_MARKALL_URL,
  API_COLLECTIONS_URL,
  API_COLLECT_TOPIC_URL,
  API_DECOLLECT_TOPIC_URL
} from '../constants';

export const api = {
  fetchTopics: (param) => dispatch(
    API_TOPICS_URL,
    {
      ...API_TOPICS_DEFAULT,
      ...param
    }
  ),
  
  postTopic: (param) => dispatch(
    API_TOPICS_URL,
    {
      ...param
    },
    'post'
  ),

  fetchTopic: (param) => dispatch(
    `${API_TOPIC_URL}/${param.topicid}`,
    {
      ...API_TOPIC_DEFAULT,
      ...param
    }
  ),

  postLogin: (param) => dispatch(
    API_LOGIN_URL,
    param,
    'post'
  ),

  fetchUser: (param) => dispatch(
    `${API_USER_URL}/${param.loginname}`,
    undefined
  ),

  postReplyUp: (param) => dispatch(
    `${API_REPLY_UP_URL}/${param.replyid}/ups`,
    param,
    'post'
  ),
  
  postReply: param => dispatch(
    `${API_TOPIC_URL}/${param.topic_id}/replies `,
    param,
    'post'
  ),

  fetchMessageCount: (param) => dispatch(
    API_MESSAGE_COUNT_URL,
    param
  ),

  fetchMessages: (param) => dispatch(
    API_MESSAGES_URL,
    {
      ...API_MESSAGES_DEFAULT,
      ...param
    }
  ),

  postMessageMarkAll: (param) => dispatch(
    API_MESSAGE_MARKALL_URL,
    param,
    'post'
  ),

  fetchCollections: (param) => dispatch(
    `${API_COLLECTIONS_URL}/${param.loginname}`,
    param
  ),

  postCollectTopic: (param) => dispatch(
    API_COLLECT_TOPIC_URL,
    param,
    'post'
  ),

  postDecollectTopic: (param) => dispatch(
    API_DECOLLECT_TOPIC_URL,
    param,
    'post'
  )
};


export function dispatch(url, options = {}, type = 'get') {
  switch (type) {
    case 'post':
      return axios[type](url, options);
    case 'get':
    default:
      return axios[type](requestUrl(url, options));
  }
}

export function requestUrl(url, param = {}) {
  url += url.indexOf('?') === -1 ? '?' : '&';

  for (let p in param) {
    if (param.hasOwnProperty(p)) {
      url += `${p}=${param[p]}&`;
    }
  }
  url = url.slice(0, -1);

  return url;
}