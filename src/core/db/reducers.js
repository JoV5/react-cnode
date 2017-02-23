import {fromJS} from 'immutable';
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

    default:
      return state;
  }
}