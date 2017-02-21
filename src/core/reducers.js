import {combineReducers} from 'redux';

import {appReducer} from './app';
import {topicReducer} from './topic';
import {userReducer} from './user';
import {messageReducer} from './message';
import {authReducer} from './auth';

export default combineReducers({
  app: appReducer,
  topic: topicReducer,
  user: userReducer,
  message: messageReducer,
  auth: authReducer
});