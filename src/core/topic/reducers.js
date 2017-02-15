import Immutable from 'immutable';
import {topicActions} from './actions';

export const TopicState = {
  all: {
    isPending: false
  },
  ask: {
    isPending: false
  },
  good: {
    isPending: false
  },
  job: {
    isPending: false
  },
  share: {
    isPending: false
  }
};

export function topicReducer(state = Immutable.fromJS(TopicState), action) {

  const {payload, type} = action;

  switch (type) {
    case topicActions.FETCH_TOPIC_PENDING:
      return state.setIn([payload.param.tab, 'isPending'], true);

    case topicActions.FETCH_TOPIC_FAILED:
      return state.setIn([payload.param.tab, 'isPending'], false);

    case topicActions.FETCH_TOPIC_FULFILLED:
      return state.merge({
        [payload.param.tab]: {
          isPending: false,
          ...payload.result.data
        }
      });

    default:
      return state;
  }
}