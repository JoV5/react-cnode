import React, {Component} from "react";
import {Route} from "react-router-dom";
import lazyme from 'lazy-load-react';
import {connect} from 'react-redux';

import {appActions} from '../../core/app';
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
        <Route path="/topics/all" component={lazyme(() => System.import('./../TopicPage/TopicAllPage'))}/>
        <Route path="/topics/good" component={lazyme(() => System.import('./../TopicPage/TopicGoodPage'))}/>
        <Route path="/topics/share" component={lazyme(() => System.import('./../TopicPage/TopicSharePage'))}/>
        <Route path="/topics/ask" component={lazyme(() => System.import('./../TopicPage/TopicAskPage'))}/>
        <Route path="/topics/job" component={lazyme(() => System.import('./../TopicPage/TopicJobPage'))}/>
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
