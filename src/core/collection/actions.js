export const collectionActions = {
  FETCH_COLLECTION_FAILED: 'FETCH_COLLECTION_FAILED',
  FETCH_COLLECTION_PENDING: 'FETCH_COLLECTION_PENDING',
  FETCH_COLLECTION_FULFILLED: 'FETCH_COLLECTION_FULFILLED',

  LOAD_COLLECTIONS: 'LOAD_COLLECTIONS',

  fetchMessageFailed: result => ({
    type: collectionActions.FETCH_COLLECTION_FAILED,
    payload: result
  }),

  fetchMessageFulfilled: result => ({
    type: collectionActions.FETCH_COLLECTION_FULFILLED,
    payload: result
  }),

  fetchMessagePending: param => ({
    type: collectionActions.FETCH_COLLECTION_PENDING,
    payload: param
  }),

  loadCollections: param => ({
    type: collectionActions.LOAD_COLLECTIONS,
    payload: param
  })
};

export const collectionRequestActions = {
  failed: collectionActions.fetchMessageFailed,
  fulfilled: collectionActions.fetchMessageFulfilled,
  pending: collectionActions.fetchMessagePending
};