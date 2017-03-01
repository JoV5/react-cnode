const API_URL = 'https://cnodejs.org/api/v1';

export const API_TOPICS_URL = `${API_URL}/topics`;

export const API_TOPICS_DEFAULT = {
  page: 1,
  limit: 20,
  tab: 'all',
  mdrender: false
};

export const API_TOPIC_URL = `${API_URL}/topic`;

export const API_TOPIC_DEFAULT = {
  mdrender : false,
  //accesstoken
};

export const API_LOGIN_URL = `${API_URL}/accesstoken`;

export const API_USER_URL = `${API_URL}/user`;

export const API_REPLY_UP_URL = `${API_URL}/reply`;

export const API_MESSAGE_COUNT_URL = `${API_URL}/message/count`;

export const API_MESSAGES_URL = `${API_URL}/messages`;

export const API_MESSAGES_DEFAULT = {
  mdrender : true
};

export const API_MESSAGE_MARKALL_URL = `${API_URL}/message/mark_all`;

export const API_COLLECTIONS_URL = `${API_URL}/topic_collect`;

export const TAB_MAP = {
  share: '分享',
  good: '精华',
  ask: '问答',
  job: '招聘',
  top: '置顶',
  all: '全部'
};