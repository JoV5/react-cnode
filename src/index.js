import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter} from "react-router-dom";
import {AppContainer} from 'react-hot-loader';

import App from "./containers/App";

const root = document.getElementById("root");

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContainer>,
    root
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(App)
  });
}
