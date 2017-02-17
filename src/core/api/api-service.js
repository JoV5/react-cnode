import axios from 'axios';

import {
  API_TOPICS_URL,
  API_TOPICS_DEFAULT,
  API_TOPIC_URL,
  API_TOPIC_DEFAULT,
  API_LOGIN_URL,
  API_USER_URL
} from '../constants';

export const api = {
  fetchTopics: (param) => dispatch(
    API_TOPICS_URL,
    {
      ...API_TOPICS_DEFAULT,
      ...param
    }
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
    {
      ...param
    },
    'post'
  ),

  fetchUser: (param) => dispatch(
    `${API_USER_URL}/${param.loginname}`,
    undefined
  )
};


export function dispatch(url, options = {}, type = 'get') {
  return axios[type](requestUrl(url, options));
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