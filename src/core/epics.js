import {combineEpics} from 'redux-observable';

import {topicEpics} from './topic';
import {userEpics} from './user';
import {localStoreEpics} from './localstore';
import {replyEpics} from './reply';
import {messageEpics} from './message';
import {appEpics} from './app';
import {authEpics} from './auth';
import {collectionEpics} from './collection';

export default combineEpics(
  ...topicEpics,
  ...userEpics,
  ...localStoreEpics,
  ...replyEpics,
  ...messageEpics,
  ...appEpics,
  ...authEpics,
  ...collectionEpics
);