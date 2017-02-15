const API_URL = '//cnodejs.org/api/v1';

export const API_TOPIC_URL = `${API_URL}/topics`;

export const API_TOPIC_DEFAULT = {
  page: 1,
  limit: 20,
  tab: 'all',
  mdrender: true
};

export const TAB_MAP = {
  share: '分享',
  good: '精华',
  ask: '问答',
  job: '招聘',
  top: '置顶'
};