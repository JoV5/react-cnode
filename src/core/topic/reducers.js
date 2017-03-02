import {fromJS} from 'immutable';
import {topicActions} from './actions';

export const TopicState = {
  all: {
    isPending: false,
    isReloading: false,
    data: [],
    scrollTop: 0
  },
  ask: {
    isPending: false,
    isReloading: false,
    data: [],
    scrollTop: 0
  },
  good: {
    isPending: false,
    isReloading: false,
    data: [],
    scrollTop: 0
  },
  job: {
    isPending: false,
    isReloading: false,
    data: [],
    scrollTop: 0
  },
  share: {
    isPending: false,
    isReloading: false,
    data: [],
    scrollTop: 0
  },
  topicsNavIsShow: false,
  selectedTab: 'all',
  topicsHeaderIsShow: true
};

export function topicReducer(state = fromJS(TopicState), action) {

  if (!topicActions.hasOwnProperty(action.type)) {
    return state;
  }

  const {payload, type} = action;

  switch (type) {
    case topicActions.FETCH_TOPIC_PENDING:

      if (payload.type === 'topics') {
        return state.setIn([payload.param.tab, payload.param.reload ? 'isReloading' : 'isPending'], true);
      }

      return state;

    case topicActions.FETCH_TOPIC_FAILED:

      if (payload.type === 'topics') {
        return state.setIn([payload.param.tab, payload.param.reload ? 'isReloading' : 'isPending'], false);
      }

      return state;

    case topicActions.FETCH_TOPIC_FULFILLED:

      if (payload.type === 'topics') {
        const ids = payload.result.data.data.map(data => data.id);
        const loadState = {
          isReloading: state.getIn([payload.param.tab, 'isReloading']),
          isPending: state.getIn([payload.param.tab, 'isPending']),
        };

        return state.merge({
          [payload.param.tab]: {
            data: payload.param.reload ? ids : state.getIn([payload.param.tab, 'data']).concat(ids),
            ...loadState,
            [payload.param.reload ? 'isReloading' : 'isPending']: false,
            page: payload.param.page
          }
        });
      }

      return state;

    case topicActions.SAVE_SCROLL_TOP:
      return state.setIn([payload.tab, 'scrollTop'], payload.scrollTop);

    case topicActions.TOGGLE_TOPICS_NAV:
      return state.set('topicsNavIsShow', !state.get('topicsNavIsShow'));

    case topicActions.SAVE_SELECTED_TAB:
      return state.set('selectedTab', payload);

    default:
      return state;
  }
}