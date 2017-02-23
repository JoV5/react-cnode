export const getDB = (state) => state.db;

export const getDBTopics = (state) => getDB(state).get('topics');

export const getDBUsers = (state) => getDB(state).get('users');

export const getDBReplies = (state) => getDB(state).get('replies');

export const getDBMessages = (state) => getDB(state).get('messages');