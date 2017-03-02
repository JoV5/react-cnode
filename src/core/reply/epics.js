import {replyActions} from './actions';
import {postReplyUp} from '../../core/api';
import {dbActions} from '../db';

export function replyUp(action$) {
  return action$.ofType(replyActions.REPLY_UP)
    .switchMap(({payload}) => postReplyUp(payload))
    .filter(({type}) => type === replyActions.FETCH_REPLY_FULFILLED)
    .map(({payload: {param: {replyid, userid}, result: {data: {action}}}}) =>
      dbActions.updateReplyUp(replyid, userid, action) // 点赞成功后更新topics内相应评论的ups
    )
}

export const replyEpics = [
  replyUp
];