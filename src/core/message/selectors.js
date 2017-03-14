export const getStateMessage = (state) => state.message;

export const getMessages = (state) => getStateMessage(state).get('messages');