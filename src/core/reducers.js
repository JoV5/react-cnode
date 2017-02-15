/**
 * Created by jiawei6 on 2017/2/10.
 */
import {combineReducers} from 'redux';

import {appReducer} from './app';
import {topicReducer} from './topic';
import {userReducer} from './user';

export default combineReducers({
  app: appReducer,
  topic: topicReducer,
  user: userReducer
});