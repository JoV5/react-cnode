import {combineEpics} from 'redux-observable';

import {topicEpics} from './topic';
import {userEpics} from './user';
import {localStoreEpics} from './localstore';
import {replyEpics} from './reply';

export default combineEpics(
  ...topicEpics,
  ...userEpics,
  ...localStoreEpics,
  ...replyEpics
);