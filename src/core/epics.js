import {combineEpics} from 'redux-observable';

import {topicEpics} from './topic';
import {userEpics} from './user';
import {localStoreEpics} from './localstore';

export default combineEpics(
  ...topicEpics,
  ...userEpics,
  ...localStoreEpics
);