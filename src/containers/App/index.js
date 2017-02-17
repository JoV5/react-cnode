import React, {Component} from "react";
import {Route, Redirect, Switch, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import lazyme from 'lazy-load-react';

import {appActions} from '../../core/app';
import {userActions} from '../../core/user';
import {TopicsAllPage, TopicsAskPage, TopicsGoodPage, TopicsJobPage, TopicsSharePage} from '../TopicsPage';
import AppHeader from '../../components/AppHeader';
import AppNav from '../../components/AppNav';
//import PrivateRoute from '../../components/PrivateRoute';
//import UserPage from '../UserPage';

import './index.css';

export class App extends Component {

  constructor() {
    super(...arguments);
    this.onHeaderLeftClick = this.onHeaderLeftClick.bind(this);
    this.onHeaderRightClick = this.onHeaderRightClick.bind(this);
  }

  onHeaderLeftClick() {
    const {toggleAppNav, app} = this.props;
    toggleAppNav(!app.get('appNavIsShow'));
  }

  onHeaderRightClick() {
    const {push} = this.props;
    push('/newtopic');
  }

  render() {
    const {props, onHeaderLeftClick, onHeaderRightClick} = this;
    const {toggleAppNav, app, me, logout} = props;
    const appNavIsShow = app.get('appNavIsShow');

    return (
      <div className="root">
        <AppHeader onLeftBtnClick={onHeaderLeftClick} onRightBtnClick={onHeaderRightClick}/>
        <AppNav toggleAppNav={toggleAppNav} appNavIsShow={appNavIsShow} me={me} logout={logout}/>
        <main className="app_main">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/topics/all"/>}/>
            <Route path="/topics/all" component={TopicsAllPage}/>
            <Route path="/topics/good" component={TopicsGoodPage}/>
            <Route path="/topics/share" component={TopicsSharePage}/>
            <Route path="/topics/ask" component={TopicsAskPage}/>
            <Route path="/topics/job" component={TopicsJobPage}/>
            <Route path="/newtopic" component={lazyme(() => System.import('../NewTopicPage'))}/>
            <Route path="/topic/:topicid" component={lazyme(() => System.import('../TopicPage'))}/>
            <Route path="/user/:loginname" component={lazyme(() => System.import('../UserPage'))}/>
            <Route path="/login" component={lazyme(() => System.import('../LoginPage'))}/>
          </Switch>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    me: state.user.get('me')
  };
};

const mapDispatchToProps = {
  toggleAppNav: appActions.toggleAppNav,
  logout: userActions.logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
