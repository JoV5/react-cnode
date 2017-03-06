import {fromJS, List} from 'immutable';
import {messageActions} from './actions';

export const MessageState = {
  messageCount: undefined,
  messages: undefined,
  isPendingMessages: false
};

export function messageReducer(state = fromJS(MessageState), action) {
  const {type} = action;

  if (!messageActions.hasOwnProperty(type)) {
    return state;
  }

  const {payload: {type: payloadType, result}} = action;

  switch (type) {

    case messageActions.FETCH_MESSAGE_PENDING:
      if (payloadType === 'messages') {
        return state.set('isPendingMessages', true);
      }

      return state;

    case messageActions.FETCH_MESSAGE_FAILED:

      return state;

    case messageActions.FETCH_MESSAGE_FULFILLED:
      if (payloadType === 'messagecount') {
        return state.set('messageCount', result.data.data);
      } else if (payloadType === 'messages') {
        const messages = new List().concat(result.data.data.hasnot_read_messages, result.data.data.has_read_messages);

        return state.merge({
          isPendingMessages: false,
          messages: messages
            .sort((message1, message2) => { // 不管是否标记为已读都按创建时间最新排序
              return new Date(message2.create_at).getTime() - new Date(message1.create_at).getTime()
            })
            .map((messages) =>
              messages.id
            )
        });
      } else if (payloadType === 'messagemarkall') {
        if (result.data.success) {
          return state.set('messageCount', 0);
        }
      }

      return state;

    default:
      return state;
  }
}