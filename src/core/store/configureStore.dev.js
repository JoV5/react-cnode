import {applyMiddleware, compose, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import reducers from '../reducers';
import epics from '../epics';

const epicMiddleware = createEpicMiddleware(epics);

export default preloadedState => {
  let middleware = applyMiddleware(epicMiddleware);

  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    middleware = composeEnhancers(middleware);
  }

  const store = createStore(reducers, preloadedState, middleware);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default)
    });
    module.hot.accept('../epics', () => {
      epicMiddleware.replaceEpic(require('../epics').default);
    });
  }

  return store;
}