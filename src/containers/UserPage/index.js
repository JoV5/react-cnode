import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {List} from 'immutable';

import {userActions} from '../../core/user';
import {timeago} from '../../core/utils';
import RecentList from './RecentList';
import {getDBUsers, getDBTopics} from '../../core/db';
import {getMatchedUserName} from '../../core/user';

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
    const {loadUser, recentTopics, matchedName} = props;

    if (!recentTopics) {
      loadUser({
        loginname: matchedName
      });
    }
  }

  /**
   * loginname变更加载新的数据
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const {loadUser, matchedName, recentTopics} = nextProps;

    if (!recentTopics) {
      loadUser({
        loginname: matchedName
      });
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
    const {matchedUser, recentTopics, recentReplies} = props;

    if (matchedUser && recentTopics && recentReplies) {
      //const {loginname, avatar_url, create_at, score} = matchedUser;
      const loginname = matchedUser.get('loginname');
      const avatar_url = matchedUser.get('avatar_url');
      const create_at = matchedUser.get('create_at');
      const score = matchedUser.get('score');

      return (
        <div>
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
        <div>
          加载中...
        </div>
      );
    }
  }
}

const mapStateToProps = createSelector(
  getDBTopics,
  getDBUsers,
  getMatchedUserName,
  (dbTopics, dbUsers, matchedName) => {
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
      recentReplies
    }
  }
);

const mapDispatchToProps = {
  loadUser: userActions.loadUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
