import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {userActions} from '../../core/user';
import {timeago} from '../../core/utils';
import RecentList from '../../components/RecentList';
import {getStateAuth} from '../../core/auth';
import {getDBUsers, getDBTopics} from '../../core/db';
import {appActions} from '../../core/app';
import {getMatchedUserName} from '../../core/user';
import Loading from '../../components/Loading';
import {getIsPendingUser} from '../../core/user';
import {getAppNavIsShow} from '../../core/app';

import './index.css';

export class UserPage extends Component {

  state = {
    tabSelected: 'replies' // topics
  };

  constructor() {
    super(...arguments);
    this.switchTab = this.switchTab.bind(this);
  }

  /**
   * 在装载前进行数据加载
   */
  componentWillMount() {
    const {props} = this;
    const {loadUser, recentTopics, matchedName, auth, toggleAppNav} = props;
    const loginname = auth.get('loginname');

    // 根据是否有recentTopics判断是否需要加载数据
    if (!recentTopics) {
      loadUser({
        loginname: matchedName
      });
    }

    toggleAppNav(loginname === matchedName);
  }

  /**
   * loginname变更加载新的数据
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const {loadUser, matchedName, recentTopics, toggleAppNav, auth, isPendingUser, appNavIsShow} = nextProps;
    const loginname = auth.get('loginname');

    // 根据是否有recentTopics判断是否需要加载数据
    if (!recentTopics && !isPendingUser) {
      loadUser({
        loginname: matchedName
      });
    }

    if (loginname === matchedName) {
      !appNavIsShow && toggleAppNav(true);
    } else {
      appNavIsShow && toggleAppNav(false);
    }
  }

  /**
   * 这里使用了state管理状态
   * @param tab
   */
  switchTab(tab) {
    this.setState({
      tabSelected: tab
    })
  }

  render() {
    const {props, state: {tabSelected}} = this;
    const {matchedUser, recentTopics, recentReplies, history: {goBack}, auth} = props;
    if (matchedUser && recentTopics && recentReplies) {
      //const {loginname, avatar_url, create_at, score} = matchedUser;
      const loginname = matchedUser.get('loginname');
      const avatar_url = matchedUser.get('avatar_url');
      const create_at = matchedUser.get('create_at');
      const score = matchedUser.get('score');
      const authname = auth.get('loginname');
      const isMe = loginname === authname;

      return (
        <div className="user_page">
          <div className="user_page_header">
            {isMe ?
              <i className="iconfont user_setting">&#xe779;</i> :
              <i className="iconfont user_back" onClick={goBack}>&#xe6e6;</i>
            }
          </div>
          <section className="user_page_userinfo">
            <img src={avatar_url} className="user_page_avatar" alt={loginname}/>
            <div className="user_page_userinfo_detail">
              <span>{loginname}</span>
              <span>注册时间：{timeago(create_at)}</span>
              <span>积分：{score}</span>
            </div>
          </section>
          <section>
            <div className="user_page_tabs">
              <div className={`user_page_tab ${tabSelected === 'replies' ? 'selected' : ''}`}
                   onClick={() => this.switchTab('replies')}>
                最近回复
              </div>
              <div className={`user_page_tab ${tabSelected === 'topics' ? 'selected' : ''}`}
                   onClick={() => this.switchTab('topics')}>
                最近发布
              </div>
            </div>
            <div>
              {
                tabSelected === 'replies' ?
                  <RecentList data={recentReplies}/> :
                  <RecentList data={recentTopics}/>
              }
            </div>
          </section>
        </div>
      );
    } else {
      return (
        <Loading/>
      );
    }
  }
}

const mapStateToProps = createSelector(
  getDBTopics,
  getDBUsers,
  getMatchedUserName,
  getStateAuth,
  getIsPendingUser,
  getAppNavIsShow,
  (dbTopics, dbUsers, matchedName, auth, isPendingUser, appNavIsShow) => {
    let matchedUser = dbUsers.get(matchedName);
    let recentTopics = false;
    let recentReplies = false;

    const getTopicById = (topicId) => {
      const topic = dbTopics.get(topicId);
      return topic.set('author', dbUsers.get(topic.get('author')))
    };

    if (matchedUser) {
      recentTopics = matchedUser.get('recent_topics');
      recentReplies = matchedUser.get('recent_replies');

      recentTopics && (recentTopics = recentTopics.map(getTopicById));
      recentReplies && (recentReplies = recentReplies.map(getTopicById));
    } else {
      matchedUser = false;
    }

    return {
      matchedUser,
      matchedName,
      recentTopics,
      recentReplies,
      auth,
      isPendingUser,
      appNavIsShow
    }
  }
);

const mapDispatchToProps = {
  loadUser: userActions.loadUser,
  toggleAppNav: appActions.toggleAppNav
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
