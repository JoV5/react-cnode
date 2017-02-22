export const dbActions = {
  DB_MERGE_DEEP: 'DB_MERGE_DEEP',

  mergeDeep: data => ({
    type: dbActions.DB_MERGE_DEEP,
    payload: data
  })
};