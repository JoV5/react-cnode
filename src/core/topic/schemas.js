import {schema} from 'normalizr';

import {repliesSchema} from '../reply';

const userSchema = new schema.Entity('users', {}, {
    idAttribute: 'loginname'
});

export const topicSchema = new schema.Entity('topics', {
  author: userSchema,
  replies: repliesSchema
});

export const topicsSchema = new schema.Array(topicSchema);