import {Map} from 'immutable';
import {replyActions} from './actions';

const ReplyState = {
  show: false
};

export function replyReducer(state = new Map(ReplyState), action) {

  const {payload} = action;

  switch (action.type) {

    case replyActions.FETCH_REPLY_FULFILLED:
      return state.merge({
        show: false
      });

    case replyActions.TOGGLE_REPLY_BOX:
      if (payload.show) {
        return state.merge(payload);
      } else {
        return state.merge({
          show: false,
          reply_id: undefined,
          topic_id: undefined,
          replyTo: undefined
        })
      }

    default:
      return state;
  }
}