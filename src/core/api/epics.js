import {Observable} from 'rxjs/Observable';

import {topicRequestAction} from '../topic';
import {api} from './api-service';

const fetchEntities = function (apiFunction, actions, type, param) {

  return Observable.create(function (observer) {

    observer.next(actions.pending({
      type,
      param
    }));

    apiFunction(param)
      .then(function (data) {
        observer.next(actions.fulfilled({
          type,
          param,
          result: data
        }));
      })
      .catch(function (error) {
        observer.next(actions.failed({
          type,
          param,
          error
        }))
      });
  })
};

export const fetchTopic = fetchEntities.bind(null, api.fetchTopics, topicRequestAction, 'topic');