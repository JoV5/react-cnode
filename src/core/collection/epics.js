import {normalize} from 'normalizr';

import {collectionActions} from './actions';
import {fetchCollections} from '../../core/api';
import {dbActions} from '../db';
import {topicsSchema} from '../topic';

export function loadCollections(action$) {
  return action$.ofType(collectionActions.LOAD_COLLECTIONS)
    .switchMap(({payload}) => fetchCollections(payload));
}

export function fetchCollectionFulfilled(action$) {
  return action$.ofType(collectionActions.FETCH_COLLECTION_FULFILLED)
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

export const collectionEpics = [
  loadCollections,
  fetchCollectionFulfilled
];