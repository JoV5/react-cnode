export const localStoreActions = {
	SAVE_TO_LOCAL: 'SAVE_TO_LOCAL',
	DELETE_LOCAL: 'DELETE_LOCAL',

	saveToLocal: (key, value) => ({
		type: localStoreActions.SAVE_TO_LOCAL,
		payload: {
			key,
			value
		}
	}),

	deleteLocal: key => ({
		type: localStoreActions.DELETE_LOCAL,
		payload: {
			key
		}
	})
};