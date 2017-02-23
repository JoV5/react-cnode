import {Observable} from 'rxjs/Observable';

import {topicRequestActions} from '../topic';
import {userRequestActions} from '../user';
import {replyRequestActions} from '../reply';
import {messageRequestActions} from '../message';
import {collectionRequestActions} from '../collection';
import {authRequestActions} from '../auth';
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

export const fetchTopics = fetchEntities.bind(null, api.fetchTopics, topicRequestActions, 'topics');
export const fetchTopic = fetchEntities.bind(null, api.fetchTopic, topicRequestActions, 'topic');
export const postLogin = fetchEntities.bind(null, api.postLogin, authRequestActions, 'login');
export const fetchUser = fetchEntities.bind(null, api.fetchUser, userRequestActions, 'user');
export const postReplyUp = fetchEntities.bind(null, api.postReplyUp, replyRequestActions, 'replyup');
export const fetchMessageCount = fetchEntities.bind(null, api.fetchMessageCount, messageRequestActions, 'messagecount');
export const fetchMessages = fetchEntities.bind(null, api.fetchMessages, messageRequestActions, 'messages');
export const postMessageMarkAll = fetchEntities.bind(null, api.postMessageMarkAll, messageRequestActions, 'messagemarkall');
export const fetchCollections = fetchEntities.bind(null, api.fetchCollections, collectionRequestActions, 'collections');