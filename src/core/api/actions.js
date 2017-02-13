import {fetchTopic} from './thunks';

export const apiActions = {
  LOAD_TOPIC: 'LOAD_TOPIC',

  loadTopic: param => dispatch => fetchTopic(param, dispatch)
};