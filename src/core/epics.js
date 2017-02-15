import {combineEpics} from 'redux-observable';

import {topicEpics} from './topic';
import {userEpics} from './user';

export default combineEpics(
  ...topicEpics,
  ...userEpics
);