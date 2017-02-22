import {schema} from 'normalizr';

import {topicsSchema} from '../topic';

export const userSchema = new schema.Entity('users',
  {
    recent_topics: topicsSchema,
    recent_replies: topicsSchema,
  },
  {
    idAttribute: 'loginname'
  }
);