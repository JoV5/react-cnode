import 'normalize.css';
import 'github-markdown-css';
import 'rxjs';
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import {AppContainer} from 'react-hot-loader';
import {fromJS} from 'immutable';
import {normalize} from 'normalizr';

import App from "./containers/App";
import configureStore from './core/store';
import {userSchema} from './core/user';
import {dbActions} from './core/db';

const root = document.getElementById("root");
let localMe = localStorage.getItem('auth');

localMe && (localMe = JSON.parse(localMe));

// 初始化State，根据是否登录
export const store = configureStore(
  localMe
    ? {
      auth: fromJS(localMe)
    }
    : undefined
);

export const dispatch = store.dispatch;

// 保存登录用户至db
localMe && dispatch(dbActions.mergeDeep(normalize(localMe, userSchema).entities));

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(App);
  });
}