import {schema} from 'normalizr';

export const userSchema = new schema.Entity('users', {}, {
    idAttribute: 'loginname'
});

export const replySchema = new schema.Entity('replies', {
  author: userSchema
});

export const repliesSchema = new schema.Array(replySchema);