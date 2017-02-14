import {topicActions} from './actions';
import {fetchTopic} from '../../core/api';

export function loadTopic(action$) {
  return action$.ofType(topicActions.LOAD_TOPIC)
    .switchMap(({payload}) => {
      return fetchTopic(payload)
    })
}

export const topicEpics = [
  loadTopic
];