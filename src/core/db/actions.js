export const dbActions = {
  DB_MERGE_DEEP: 'DB_MERGE_DEEP',
  DB_MARK_MESSAGE: 'DB_MARK_MESSAGE',

  mergeDeep: data => ({
    type: dbActions.DB_MERGE_DEEP,
    payload: data
  }),

  markMessage: (result) => ({
    type: dbActions.DB_MARK_MESSAGE,
    payload: result
  })
};