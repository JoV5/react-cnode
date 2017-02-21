import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userActions} from '../../core/user';
import {timeago} from '../../core/utils';
import RecentList from './RecentList';

import './index.css';

const findByName = (list, name) => list.find((data) => data.loginname === name);

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
    const {loadUser, userList, match: {params: {loginname: matchedName}}} = props;

    const finded = findByName(userList, matchedName);

    if (!finded || (!finded.create_at && !finded.isPending)) {
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
    const {loadUser, userList, match: {params: {loginname: matchedName}}} = nextProps;
    const finded = findByName(userList, matchedName);

    if (!finded || (!finded.create_at && !finded.isPending)) {
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
    const {userList, match: {params: {loginname: matchedName}}} = props;
    const finded = findByName(userList, matchedName);

    if (finded && finded.create_at) {
      const {loginname, avatar_url, create_at, score} = finded;
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
              <RecentList data={finded[`recent_${tabSelected}`]}/>
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

const mapStateToProps = (state) => {
  return {
    userList: state.user
  };
};

const mapDispatchToProps = {
  loadUser: userActions.loadUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
