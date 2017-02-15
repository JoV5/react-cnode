import axios from 'axios';

import {
  API_TOPIC_URL,
  API_TOPIC_DEFAULT,
  API_LOGIN_URL
} from '../constants';

export const api = {
  fetchTopics: (param) => {
    return dispatch(
      API_TOPIC_URL,
      {
        ...API_TOPIC_DEFAULT,
        ...param
      }
    )
  },

  postLogin: (param) => {
    return dispatch(
      API_LOGIN_URL,
      {
        ...param
      },
      'post'
    )
  }
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