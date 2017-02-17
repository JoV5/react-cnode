import {Observable} from 'rxjs/Observable';

import {replyActions} from './actions';
import {postReplyUp} from '../../core/api';
import {topicActions} from '../topic';

export function replyUp(action$) {
  return action$.ofType(replyActions.REPLY_UP)
    .switchMap(({payload}) => postReplyUp(payload));
}

export function fetchReplyFulfilled(action$) {
  return action$.ofType(replyActions.FETCH_REPLY_FULFILLED)
    .switchMap(({payload}) => {
      if (payload.type === 'replyup') {
        const {param: {replyid, userid, topicid}, result: {data: {action}}} = payload;
        return Observable.of(topicActions.updateReplyUp(topicid, replyid, userid, action))
      }
    });
}

export const replyEpics = [
  replyUp,
  fetchReplyFulfilled
];