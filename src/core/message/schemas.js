import {schema} from 'normalizr';

import {userSchema} from '../user';
import {replySchema} from '../reply';
import {topicSchema} from '../topic';

export const messageSchema = new schema.Entity('messages', {
  author: userSchema,
  reply: replySchema,
  topic: topicSchema
});

export const messagesSchmas = new schema.Array(messageSchema);