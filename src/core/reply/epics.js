import {Observable} from 'rxjs/Observable';

import {replyActions} from './actions';
import {postReplyUp} from '../../core/api';
import {dbActions} from '../db';

export function replyUp(action$) {
  return action$.ofType(replyActions.REPLY_UP)
    .switchMap(({payload}) => postReplyUp(payload));
}

export function fetchReplyFulfilled(action$) {
  return action$.ofType(replyActions.FETCH_REPLY_FULFILLED)
    .switchMap(({payload}) => {
      if (payload.type === 'replyup') { // 点赞成功后更新topics内相应评论的ups
        const {param: {replyid, userid}, result: {data: {action}}} = payload;
        return Observable.of(dbActions.updateReplyUp(replyid, userid, action));
      }
    });
}

export const replyEpics = [
  replyUp,
  fetchReplyFulfilled
];