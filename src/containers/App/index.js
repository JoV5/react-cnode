import React, {Component} from "react";
import {Route, Redirect, Switch, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import lazyme from 'lazy-load-react';

import {appActions} from '../../core/app';
import {TopicsAllPage, TopicsAskPage, TopicsGoodPage, TopicsJobPage, TopicsSharePage} from '../TopicsPage';
import AppBottomNav from '../../components/AppBottomNav';
import PrivateRoute from '../../components/PrivateRoute';

const TopicPage = lazyme(() => System.import('../TopicPage'));
const NewTopicPage = lazyme(() => System.import('../NewTopicPage'));
const LoginPage = lazyme(() => System.import('../LoginPage'));
const UserPage = lazyme(() => System.import('../UserPage'));
const MessagePage = lazyme(() => System.import('../MessagePage'));
const CollectionPage = lazyme(() => System.import('../CollectionPage'));

import './index.css';

export class App extends Component {

  lastScrollTop = 0;

  constructor() {
    super(...arguments);
    this.onScrollWindow = this.onScrollWindow.bind(this);
  }

  onScrollWindow() {
    const {toggleAppNav, app} = this.props;
    const appNavIsShow = app.get('appNavIsShow');
    const scrollTop = document.body.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      appNavIsShow && toggleAppNav(false);
    } else {
      !appNavIsShow && toggleAppNav(true);
    }

    this.lastScrollTop = scrollTop;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScrollWindow);
  }

  render() {
    const {props} = this;
    const {app, auth, selectedTab} = props;
    const hasLogin = !!auth.get('accesstoken');
    const appNavIsShow = app.get('appNavIsShow');

    return (
      <div className="root">
        <main className="app_main">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/topics/all"/>}/>
            <Route path="/topics" render={({location: {pathname}}) => {
              if (pathname === '/topics') {
                return <Redirect to="/topics/all"/>;
              } else {
                return (
                  <Switch>
                    <Route path="/topics/all" render={() => <TopicsAllPage/>}/>
                    <Route path="/topics/good" render={() => <TopicsGoodPage/>}/>
                    <Route path="/topics/share" render={() => <TopicsSharePage/>}/>
                    <Route path="/topics/ask" render={() => <TopicsAskPage/>}/>
                    <Route path="/topics/job" render={() => <TopicsJobPage/>}/>
                  </Switch>
                )
              }
            }}/>
            <Route path="/topic/:topicid" component={TopicPage}/>
            <Route path="/newtopic" component={NewTopicPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/user/:loginname" component={UserPage}/>
            <PrivateRoute path="/message" component={MessagePage} hasLogin={hasLogin}/>
            <PrivateRoute path="/collection/:loginname" component={CollectionPage} hasLogin={hasLogin}/>
          </Switch>
        </main>
        <AppBottomNav auth={auth} show={appNavIsShow} selectedTab={selectedTab}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    auth: state.auth,
    selectedTab: state.topic.get('selectedTab'),
    messageCount: state.message.get('messageCount')
  };
};

const mapDispatchToProps = {
  toggleAppNav: appActions.toggleAppNav
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
