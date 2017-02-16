const API_URL = 'https://cnodejs.org/api/v1';

export const API_TOPICS_URL = `${API_URL}/topics`;

export const API_TOPICS_DEFAULT = {
  page: 1,
  limit: 20,
  tab: 'all',
  mdrender: true
};

export const API_TOPIC_URL = `${API_URL}/topic`;

export const API_TOPIC_DEFAULT = {
  mdrender : true,
  //accesstoken
};

export const API_LOGIN_URL = `${API_URL}/accesstoken`;

export const API_USER_URL = `${API_URL}/user`;

export const TAB_MAP = {
  share: '分享',
  good: '精华',
  ask: '问答',
  job: '招聘',
  top: '置顶'
};