import {fromJS} from 'immutable';
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
  },
  list: []
};

export function topicReducer(state = fromJS(TopicState), action) {

  if (!topicActions.hasOwnProperty(action.type)) {
    return state;
  }

  const {payload: {type: payloadType, param, result}, type} = action;
  const topicList = state.get('list');

  const findIndexByTopidId = (topicid) =>
    topicList.findIndex((data) => {
      return data.id === topicid
    });

  switch (type) {
    case topicActions.FETCH_TOPIC_PENDING:
      if (payloadType === 'topics') {
        return state.setIn([param.tab, 'isPending'], true);
      } else if (payloadType === 'topic') {
        const findedIndex = findIndexByTopidId(param.topicid);

        if (findedIndex > -1) {
          return state.merge({
            list: topicList.set(findedIndex, {
              isPending: true,
              id: param.topicid
            })
          });
        } else {
          return state.merge({
            list: state.get('list').push({
              isPending: true,
              id: param.topicid
            })
          });
        }
      }
      return state;

    case topicActions.FETCH_TOPIC_FAILED:
      if (payloadType === 'topics') {
        return state.setIn([param.tab, 'isPending'], false);
      } else if (payloadType === 'topic') {
        const findedIndex = findIndexByTopidId(param.topicid);

        if (findedIndex > -1) {
          return state.merge({
            list: topicList.set(findedIndex, {
              isPending: false
            })
          });
        }
      }
      return state;

    case topicActions.FETCH_TOPIC_FULFILLED:
      if (payloadType === 'topics') {
        return state.merge({
          [param.tab]: {
            ...result.data,
            isPending: false
          }
        });
      } else if (payloadType === 'topic') {
        const findedIndex = findIndexByTopidId(param.topicid);

        if (findedIndex > -1) {
          return state.merge({
            list: state.get('list').set(findedIndex, {
              ...result.data.data,
              isPending: false
            })
          });
        }
      }
      return state;

    default:
      return state;
  }
}