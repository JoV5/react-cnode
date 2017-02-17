import {localStoreActions} from './actions';

export function saveToLocal(action$) {
	return action$.ofType(localStoreActions.SAVE_TO_LOCAL)
		.do(({payload: {key, value}}) => localStorage.setItem(key, JSON.stringify(value)))
		.skip();
}

export function deleteLocal(action$) {
  return action$.ofType(localStoreActions.DELETE_LOCAL)
    .do(({payload: {key}}) => localStorage.removeItem(key))
    .skip();
}

export const localStoreEpics = [
	saveToLocal,
  deleteLocal
];