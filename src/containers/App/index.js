import React, {Component} from "react";
import {Route, Redirect, Switch, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import lazyme from 'lazy-load-react';
import {createSelector} from 'reselect';

import {appActions, getStateApp} from '../../core/app';
import {TopicsAllPage, TopicsAskPage, TopicsGoodPage, TopicsJobPage, TopicsSharePage} from '../TopicsPage';
import AppBottomNav from '../../components/AppBottomNav';
import PrivateRoute from '../../components/PrivateRoute';
import {getStateAuth} from '../../core/auth';
import {getSelectedTab} from '../../core/topic';
import {replyActions, getStateReply} from '../../core/reply';
import ReplyBox from '../../components/ReplyBox';

// TODO 直接引入反而出现异常，显示空白，可能与react router有关
// import TopicPage from '../TopicPage';
// import NewTopicPage from '../NewTopicPage';
// import LoginPage from '../LoginPage';
// import UserPage from '../UserPage';
// import MessagePage from '../MessagePage';
// import CollectionPage from '../CollectionPage';
// import SettingPage from '../SettingPage';

const TopicPage = lazyme(() => System.import('../TopicPage'));
const NewTopicPage = lazyme(() => System.import('../NewTopicPage'));
const LoginPage = lazyme(() => System.import('../LoginPage'));
const UserPage = lazyme(() => System.import('../UserPage'));
const MessagePage = lazyme(() => System.import('../MessagePage'));
const CollectionPage = lazyme(() => System.import('../CollectionPage'));
const SettingPage = lazyme(() => System.import('../SettingPage'));

import './index.css';

export class App extends Component {

  lastScrollTop = 0;

  constructor() {
    super(...arguments);
    this.onScrollWindow = this.onScrollWindow.bind(this);
    this.hideReplyBoxIfShow = this.hideReplyBoxIfShow.bind(this);
  }

  onScrollWindow() {
    const {toggleAppNav, app, location} = this.props;
    const appNavIsShow = app.get('appNavIsShow');
    const scrollTop = document.body.scrollTop;

    if (!location.pathname.match(/^\/topic\//)) {
      if (scrollTop > this.lastScrollTop) {
        appNavIsShow && toggleAppNav(false);
      } else {
        !appNavIsShow && toggleAppNav(true);
      }

      this.lastScrollTop = scrollTop;
    }
  }

  componentDidMount() {
    const {history, saveHistory} = this.props;

    history.listen(this.hideReplyBoxIfShow);
    
    saveHistory(history);
    //window.addEventListener('scroll', this.onScrollWindow);
  }

  hideReplyBoxIfShow(location, action) {
    const {reply, toggleReplyBox, history} = this.props;
    const isShow = reply.get('show');

    if (action === 'POP' && isShow) {
      history.push(); // 补一次push，避免退出页面
      toggleReplyBox({
        show: false
      });
    }
  }

  render() {
    const {props} = this;
    const {app, auth, selectedTab, reply, postReply, toggleReplyBox, history} = props;
    const accesstoken = auth.get('accesstoken');
    const author = auth.get('loginname');
    const hasLogin = !!accesstoken;
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
            <PrivateRoute path="/newtopic" component={NewTopicPage} hasLogin={hasLogin}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/setting" component={SettingPage}/>
            <Route path="/user/:loginname" component={UserPage}/>
            <PrivateRoute exact path="/user" component={UserPage} hasLogin={hasLogin}/>
            <PrivateRoute path="/message" component={MessagePage} hasLogin={hasLogin}/>
            <PrivateRoute exact path="/collection" component={CollectionPage} hasLogin={hasLogin}/>
            <Route path="/collection/:loginname" component={CollectionPage}/>
          </Switch>
        </main>
        {
          hasLogin && 
          <ReplyBox reply={reply} toggleReplyBox={toggleReplyBox} postReply={postReply} accesstoken={accesstoken}
                    author={author} history={history}/>
        }
        <AppBottomNav auth={auth} show={appNavIsShow} selectedTab={selectedTab}/>
      </div>
    )
  }
}

const mapStateToProps = createSelector(
  getStateApp,
  getStateAuth,
  getSelectedTab,
  getStateReply,
  (app, auth, selectedTab, reply) => ({
    app,
    auth,
    selectedTab,
    reply
  })
);

const mapDispatchToProps = {
  toggleAppNav: appActions.toggleAppNav,
  saveHistory: appActions.saveHistory,
  toggleReplyBox: replyActions.toggleReplyBox,
  postReply: replyActions.postReply
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
