/**
 * Created by jiawei6 on 2017/2/10.
 */
import {applyMiddleware, compose, createStore} from 'redux';

import reducers from '../reducers';

export default preloadedState => {
  let middleware = applyMiddleware();

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
  }

  return store;
}