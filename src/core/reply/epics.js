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

export function sendReplyFulfilled(action$, {getState}) {
  return action$.ofType(replyActions.FETCH_REPLY_FULFILLED)
    .filter(({payload: {result: {data: success}}}) => success)
    .map(({payload: {param: {content, author, reply_id: replyTo, topic_id}, result: {data: {reply_id}}}}) => {
      const history = getState().app.get('history');
      
      history.goBack();
      
      return dbActions.updateReply(
        topic_id,
        {
          id: reply_id,
          author,
          content,
          reply_id: replyTo,
          create_at: new Date(),
          ups: []
        }
      );
    })
}

export function toggleReplyBox(action$, {getState}) {
  return action$.ofType(replyActions.TOGGLE_REPLY_BOX)
    .do(({payload: {show}}) => {
      const history = getState().app.get('history');
      
      if (show) {
        history.push();
      } else {
        history.goBack();
      }
    })
    .skip();
}

export const replyEpics = [
  replyUp,
  sendReply,
  sendReplyFulfilled,
  toggleReplyBox
];