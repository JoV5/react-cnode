import {combineEpics} from 'redux-observable';

import {topicEpics} from './topic';

export default combineEpics(
  ...topicEpics
);