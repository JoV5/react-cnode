import 'normalize.css';
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';

import {BrowserRouter} from "react-router-dom";
import {AppContainer} from 'react-hot-loader';

import App from "./containers/App/";
import configureStore from './core/store';

const root = document.getElementById("root");

const store = configureStore();

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App/', () => {
    render(App)
  });
}
