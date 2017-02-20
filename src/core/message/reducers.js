import {fromJS} from 'immutable';
import {messageActions} from './actions';

export const MessageState = {
  messageCount: undefined
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
      }
      return state;

    default:
      return state;
  }
}