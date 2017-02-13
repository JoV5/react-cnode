import {api} from './api-service';
import {topicRequestAction} from '../topic';

const fetchEntities = function (apiFunction, actions, type, param, dispatch) {

  dispatch(actions.pending({
    type,
    param
  }));

  return apiFunction(param)
    .then(function (data) {
      dispatch(actions.fulfilled({
        type,
        param,
        result: data
      }));
    })
    .catch(function (error) {
      dispatch(actions.failed({
        type,
        param,
        error
      }));
    });
};

export const fetchTopic = fetchEntities.bind(null, api.fetchTopics, topicRequestAction, 'topic');