import {fromJS} from 'immutable';
import {collectionActions} from './actions';

const CollectionState = {
  isPendingCollections: false,
  scrollTop: 0
};

export function collectionReducer(state = fromJS(CollectionState), action) {

  if (!collectionActions.hasOwnProperty(action.type)) {
    return state;
  }

  const {type, payload} = action;

  switch (type) {
    case collectionActions.FETCH_COLLECTION_PENDING:
      if (payload.type === 'collections') {
        return state.set('isPendingCollections', true);
      }
      return state;

    case collectionActions.FETCH_COLLECTION_FAILED:
    case collectionActions.FETCH_COLLECTION_FULFILLED:
      if (payload.type === 'collections') {
        return state.set('isPendingCollections', false);
      }
      return state;

    case collectionActions.COLLECTION_SAVE_SCROLL_TOP:
      return state.set('scrollTop', payload);

    default:
      return state;
  }

}