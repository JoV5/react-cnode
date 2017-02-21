import 'normalize.css';
import 'rxjs';
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import {AppContainer} from 'react-hot-loader';
import {fromJS} from 'immutable';

import App from "./containers/App/";
import configureStore from './core/store';

const root = document.getElementById("root");
let localMe = localStorage.getItem('auth');

// 初始化State，根据是否登录
export const store = configureStore(
  localMe ? {
      auth: fromJS(JSON.parse(localMe))
    } :
    undefined
);

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
