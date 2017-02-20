import {fromJS, List} from 'immutable';
import {messageActions} from './actions';

export const MessageState = {
  messageCount: undefined,
  messages: undefined
};

export function messageReducer(state = fromJS(MessageState), action) {
  const {type} = action;

  if (!messageActions.hasOwnProperty(type)) {
    return state;
  }

  const {payload: {type: payloadType, result}} = action;

  switch (type) {
    case messageActions.FETCH_MESSAGE_PENDING:
      return state;

    case messageActions.FETCH_MESSAGE_FAILED:
      return state;

    case messageActions.FETCH_MESSAGE_FULFILLED:
      if (payloadType === 'messagecount') {
        return state.set('messageCount', result.data.data);
      } else if (payloadType === 'messages') {
        const messages = new List().concat(result.data.data.hasnot_read_messages, result.data.data.has_read_messages);

        return state.set('messages', messages.sort((message1, message2) => {
          return new Date(message2.create_at).getTime() - new Date(message1.create_at).getTime()
        }));
      } else if (payloadType === 'messagemarkall') {
        const messages = state.get('messages');
        if (messages) {
          // 标记成功后更新state相应数据
          return state.merge({
            messageCount: 0,
            messages: messages.map((message) => {
              message.has_read = true;
              return message;
            })
          })
        }
      }
      return state;

    default:
      return state;
  }
}