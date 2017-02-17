import {Observable} from 'rxjs/Observable';

import {topicRequestAction} from '../topic';
import {userRequestAction} from '../user';
import {replyRequestAction} from '../reply';
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

export const fetchTopics = fetchEntities.bind(null, api.fetchTopics, topicRequestAction, 'topics');
export const fetchTopic = fetchEntities.bind(null, api.fetchTopic, topicRequestAction, 'topic');
export const postLogin = fetchEntities.bind(null, api.postLogin, userRequestAction, 'login');
export const fetchUser = fetchEntities.bind(null, api.fetchUser, userRequestAction, 'user');
export const postReplyUp = fetchEntities.bind(null, api.postReplyUp, replyRequestAction, 'replyup');