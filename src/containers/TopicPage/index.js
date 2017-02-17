import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'github-markdown-css';
import {Link} from 'react-router-dom';

import {topicActions} from '../../core/topic';
import {TAB_MAP} from '../../core/constants';
import {timeago} from '../../core/utils';
import ReplyList from './ReplyList';

import './index.css';

const findById = (list, id) => list.find((data) => data.id === id);

export class TopicPage extends Component {

  componentWillMount() {
    const {topicList, userMe, loadTopic, match: {params: {topicid: matchedId}}} = this.props;
    const finded = findById(topicList, matchedId);
    const accesstoken = userMe.get('accesstoken');

    if (!finded || (finded && !finded.content && !finded.isPending)) {
      loadTopic({
        topicid: matchedId,
        accesstoken: accesstoken ? accesstoken : ''
      })
    }
  }

  render() {
    const {topicList, match: {params: {topicid: matchedId}}} = this.props;
    const finded = findById(topicList, matchedId);

    if (finded && finded.content) {
      const {good, tab, top, title, author: {loginname, avatar_url}, create_at, visit_count, replies, last_reply_at} = finded;
      const realTab = top ? 'top' : (good ? 'good' : tab);

      return (
        <div className="topic_page">
          <h3 className="topic_page_title">
            <span className={`topic_page_title_tab ${realTab}`}>{TAB_MAP[realTab]}</span>
            <span className="topic_page_title_content">{title}</span>
          </h3>
          <div className="topic_page_info">
            <Link to={`/user/${loginname}`}>
              <img src={avatar_url} className="topic_page_info_avatar" alt={loginname}/>
            </Link>
            <div className="topic_page_info_other">
              <div>
                <span>{loginname}</span>
                <span className="float_right">{visit_count} 次浏览</span>
              </div>
              <div>
                <span>发布于 {timeago(create_at)}</span>
                <span className="float_right">最后回复于 {timeago(last_reply_at)}</span>
              </div>
            </div>
          </div>
          <div className="markdown-body topic_page_content" dangerouslySetInnerHTML={{__html: finded.content}} />
          <ReplyList data={replies}/>
        </div>
      )
    } else {
      return (
        <div>
          加载中..
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    topicList: state.topic.get('list'),
    userMe: state.user.get('me')
  };
};

const mapDispatchToProps = {
  loadTopic: topicActions.loadTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicPage);