import {normalize} from 'normalizr';

import {messageActions} from './actions';
import {fetchMessageCount, fetchMessages, postMessageMarkAll} from '../../core/api';
import {dbActions} from '../db';
import {messagesSchmas} from './schemas';

export function loadMessageCount(action$) {
  return action$.ofType(messageActions.LOAD_MESSAGE_COUNT)
    .switchMap(({payload}) => fetchMessageCount(payload));
}

export function loadMessages(action$) {
  return action$.ofType(messageActions.LOAD_MESSAGES)
    .switchMap(({payload}) => fetchMessages(payload));
}

export function markAllMessage(action$) {
  return action$.ofType(messageActions.MARK_ALL_MESSAGE)
    .switchMap(({payload}) => postMessageMarkAll(payload));
}

export function fetchMessageFulfilled(action$) {
  return action$.ofType(messageActions.FETCH_MESSAGE_FULFILLED)
    .map(({payload: {result, type}}) => {
      if (type === 'messages') {

        let data = result.data.data;
        data = data.has_read_messages.concat(data.hasnot_read_messages);

        return dbActions.mergeDeep(normalize(data, messagesSchmas).entities);

      } else if (type === 'messagemarkall') { // 标记db中的message

        if (result.data.success) {
          return dbActions.markMessage(result.data);
        }
      }

      return false;
    })
    .filter(action => action);
}

export const messageEpics = [
  loadMessageCount,
  loadMessages,
  markAllMessage,
  fetchMessageFulfilled
];