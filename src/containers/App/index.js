import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from 'react-redux';

import {appActions} from '../../core/app';
import {TopicAllPage, TopicAskPage, TopicGoodPage, TopicJobPage, TopicSharePage} from '../TopicPage';
import AppHeader from './AppHeader';
import AppNav from '../../components/AppNav';

import './index.css';

export class App extends Component {

  constructor() {
    super(...arguments);
    this.onHeaderLeftClick = this.onHeaderLeftClick.bind(this);
  }

  onHeaderLeftClick() {
    const {toggleAppNav, app} = this.props;
    toggleAppNav(!app.get('appNavIsShow'));
  }

  render() {
    const {props, onHeaderLeftClick} = this;
    const {toggleAppNav, app} = props;
    const appNavIsShow = app.get('appNavIsShow');

    return (
      <div className="root">
        <AppHeader onLeftBtnClick={onHeaderLeftClick}/>
        <AppNav toggleAppNav={toggleAppNav} appNavIsShow={appNavIsShow}/>
        <main className="app_main">
          <Route path="/topics/all" component={TopicAllPage}/>
          <Route path="/topics/good" component={TopicGoodPage}/>
          <Route path="/topics/share" component={TopicSharePage}/>
          <Route path="/topics/ask" component={TopicAskPage}/>
          <Route path="/topics/job" component={TopicJobPage}/>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = {
  toggleAppNav: appActions.toggleAppNav,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
