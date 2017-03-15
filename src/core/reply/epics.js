import {replyActions} from './actions';
import {postReplyUp, postReply} from '../../core/api';
import {dbActions} from '../db';

export function replyUp(action$) {
  return action$.ofType(replyActions.REPLY_UP)
    .switchMap(({payload}) => postReplyUp(payload))
    .filter(({type}) => type === replyActions.FETCH_REPLY_FULFILLED)
    .map(({payload: {param: {replyid, userid}, result: {data: {action}}}}) =>
      dbActions.updateReplyUp(replyid, userid, action) // 点赞成功后更新topics内相应评论的ups
    )
}

export function sendReply(action$) {
  return action$.ofType(replyActions.POST_REPLY)
    .switchMap(({payload}) => postReply(payload));
}

export function sendReplyFulfilled(action$) {
  return action$.ofType(replyActions.FETCH_REPLY_FULFILLED)
    .filter(({payload: {result: {data: success}}}) => success)
    .map(({payload: {param: {content, author, reply_id: replyTo, topic_id}, result: {data: {reply_id}}}}) => {
      return dbActions.mergeDeep({
        topics: {
          [topic_id]: {
            replies: [reply_id]
          }
        },
        replies: {
          [reply_id]: {
            id: reply_id,
            author,
            content,
            reply_id: replyTo,
            create_at: new Date(),
            ups: []
          }
        }
      });
    })
  
}

export const replyEpics = [
  replyUp,
  sendReply,
  sendReplyFulfilled
];