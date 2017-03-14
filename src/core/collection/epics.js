import {normalize} from 'normalizr';

import {collectionActions} from './actions';
import {fetchCollections, postCollectTopic, postDecollectTopic} from '../../core/api';
import {dbActions} from '../db';
import {topicsSchema} from '../topic';

export function loadCollections(action$) {
  return action$.ofType(collectionActions.LOAD_COLLECTIONS)
    .switchMap(({payload}) => fetchCollections(payload));
}

export function loadCollectionsFulfilled(action$) {
  return action$.ofType(collectionActions.FETCH_COLLECTION_FULFILLED)
    .filter(({payload: {type}}) => type === 'collections')
    .map(({payload: {result: {data: {data}}, param: {loginname}}}) => {
      const collections = data.map((collection) => collection.id);
      const result = normalize(data, topicsSchema).entities;

      !result.users && (result.users = {});
      result.users[loginname] = {
        ...result.users[loginname],
        collections
      };
      return dbActions.mergeDeep(result);
    });
}

export function collectTopic(action$) {
  return action$.ofType(collectionActions.COLLECT_TOPIC)
    .switchMap(({payload}) => postCollectTopic(payload))
    .filter(({type}) => type === collectionActions.FETCH_COLLECTION_FULFILLED)
    .filter(({payload: {result: {data: success}}}) => success)
    .map(({payload: {param: {loginname, topic_id}}}) =>
      dbActions.updateUserCollect(loginname, topic_id, true)
    );
}

export function decollectTopic(action$) {
  return action$.ofType(collectionActions.DECOLLECT_TOPIC)
    .switchMap(({payload}) => postDecollectTopic(payload))
    .filter(({type}) => type === collectionActions.FETCH_COLLECTION_FULFILLED)
    .filter(({payload: {result: {data: {success}}}}) => success)
    .map(({payload: {param: {loginname, topic_id}}}) =>
      dbActions.updateUserCollect(loginname, topic_id, false)
    );
}

export const collectionEpics = [
  loadCollections,
  loadCollectionsFulfilled,
  collectTopic,
  decollectTopic
];