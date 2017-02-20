import {messageActions} from './actions';
import {fetchMessageCount, fetchMessages, postMessageMarkAll} from '../../core/api';

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

export const messageEpics = [
  loadMessageCount,
  loadMessages,
  markAllMessage
];