import {fromJS} from 'immutable';
import {topicActions} from './actions';

export const TopicState = {
  all: {
    isPending: false,
    data: [],
    scrollTop: 0
  },
  ask: {
    isPending: false,
    data: [],
    scrollTop: 0
  },
  good: {
    isPending: false,
    data: [],
    scrollTop: 0
  },
  job: {
    isPending: false,
    data: [],
    scrollTop: 0
  },
  share: {
    isPending: false,
    data: [],
    scrollTop: 0
  },
  list: []
};

const findIndexByTopidId = (topicList, topicid) =>
  topicList.findIndex((data) => {
    return data.id === topicid;
  });

export function topicReducer(state = fromJS(TopicState), action) {

  if (!topicActions.hasOwnProperty(action.type)) {
    return state;
  }

  const {payload, type} = action;
  const {type: payloadType, param, result} = payload;
  const topicList = state.get('list');

  switch (type) {
    case topicActions.FETCH_TOPIC_PENDING:

      if (payloadType === 'topics') {
        return state.setIn([param.tab, 'isPending'], true);
      }

      return state;

    case topicActions.FETCH_TOPIC_FAILED:

      if (payloadType === 'topics') {
        return state.setIn([param.tab, 'isPending'], false);
      }

      return state;

    case topicActions.FETCH_TOPIC_FULFILLED:

      if (payloadType === 'topics') {
        return state.merge({
          [param.tab]: {
            data: state.getIn([param.tab, 'data']).concat(result.data.data.map(data => data.id)),
            isPending: false,
            page: param.page
          }
        });
      }

      return state;

    case topicActions.SAVE_SCROLL_TOP:
      return state.setIn([payload.tab, 'scrollTop'], payload.scrollTop);

    default:
      return state;
  }
}