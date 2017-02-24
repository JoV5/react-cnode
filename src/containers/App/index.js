import React, {Component} from "react";
import {Route, Redirect, Switch, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import lazyme from 'lazy-load-react';

import {appActions} from '../../core/app';
import {authActions} from '../../core/auth';
import {TopicsAllPage, TopicsAskPage, TopicsGoodPage, TopicsJobPage, TopicsSharePage} from '../TopicsPage';
import AppHeader from '../../components/AppHeader';
import AppNav from '../../components/AppNav';
import PrivateRoute from '../../components/PrivateRoute';
//import UserPage from '../UserPage';

const TopicPage = lazyme(() => System.import('../TopicPage'));
const NewTopicPage = lazyme(() => System.import('../NewTopicPage'));
const LoginPage = lazyme(() => System.import('../LoginPage'));
const UserPage = lazyme(() => System.import('../UserPage'));
const MessagePage = lazyme(() => System.import('../MessagePage'));
const CollectionPage = lazyme(() => System.import('../CollectionPage'));

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
    const {toggleAppNav, app, auth, logout, messageCount} = props;
    const hasLogin = !!auth.get('accesstoken');
    const appNavIsShow = app.get('appNavIsShow');

    return (
      <div className="root">
        <AppHeader onLeftBtnClick={onHeaderLeftClick} onRightBtnClick={onHeaderRightClick}/>
        <AppNav toggleAppNav={toggleAppNav} appNavIsShow={appNavIsShow} auth={auth} logout={logout} messageCount={messageCount}/>
        <main className="app_main">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/topics/all"/>}/>
            <Route path="/topics/all" component={TopicsAllPage}/>
            <Route path="/topics/good" component={TopicsGoodPage}/>
            <Route path="/topics/share" component={TopicsSharePage}/>
            <Route path="/topics/ask" component={TopicsAskPage}/>
            <Route path="/topics/job" component={TopicsJobPage}/>
            <Route path="/topic/:topicid" component={TopicPage}/>
            <Route path="/newtopic" component={NewTopicPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/user/:loginname" component={UserPage}/>
            <PrivateRoute path="/message" component={MessagePage} hasLogin={hasLogin}/>
            <PrivateRoute path="/collection/:loginname" component={CollectionPage} hasLogin={hasLogin}/>
          </Switch>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    auth: state.auth,
    messageCount: state.message.get('messageCount')
  };
};

const mapDispatchToProps = {
  toggleAppNav: appActions.toggleAppNav,
  logout: authActions.logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
