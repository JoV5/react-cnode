import {fromJS, List} from 'immutable';
import {dbActions} from './actions';

export const DBState = {
  topics: {},
  users: {},
  replies: {},
  messages: {}
};

export function dbReducer(state = fromJS(DBState), action) {
  const {type} = action;

  if (!dbActions.hasOwnProperty(type)) {
    return state;
  }

  const {payload} = action;

  switch (type) {
    case dbActions.DB_MERGE_DEEP:
      return state.mergeDeep(payload);

    case dbActions.DB_MARK_MESSAGE:

      return state.update('messages', messages =>
        messages.map(message =>
          message.set('has_read', true)
        )
      );

    case dbActions.DB_UPDATE_REPLY_UP:

      return state.updateIn(['replies', payload.replyid, 'ups'], ups => {
        const findedIndex = ups.findIndex((up) => up === payload.userid);

        if (findedIndex > -1 && payload.action === 'down') {
          return ups.delete(findedIndex);
        } else if (findedIndex <= -1 && payload.action === 'up') {
          return ups.push(payload.userid);
        }

        return ups;
      });

    case dbActions.DB_UPDATE_REPLY:
      let newState = state.updateIn(['topics', payload.topic_id, 'replies'], replies => {
        return replies ? replies.unshift(payload.reply.id) : new List([payload.reply.id]);
      });
      
      return newState.mergeDeep({
        replies: {
          [payload.reply.id]: payload.reply
        }
      });

    case dbActions.DB_UPDATE_USER_COLLECT:

      return state.updateIn(['users', payload.loginname, 'collections'], collections => {
        const findedIndex = collections.findIndex((collection) => collection === payload.topicid);

        if (findedIndex <= -1 && payload.isCollect) {
          return collections.unshift(payload.topicid);
        } else if (findedIndex > -1 && !payload.isCollect) {
          return collections.delete(findedIndex);
        }

        return collections;
      });

    default:
      return state;
  }
}