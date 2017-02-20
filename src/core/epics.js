import {combineEpics} from 'redux-observable';

import {topicEpics} from './topic';
import {userEpics} from './user';
import {localStoreEpics} from './localstore';
import {replyEpics} from './reply';
import {messageEpics} from './message';

export default combineEpics(
  ...topicEpics,
  ...userEpics,
  ...localStoreEpics,
  ...replyEpics,
  ...messageEpics
);