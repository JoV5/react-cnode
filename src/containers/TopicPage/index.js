import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'github-markdown-css';
import {Link} from 'react-router-dom';

import {topicActions} from '../../core/topic';
import {replyActions} from '../../core/reply';
import {TAB_MAP} from '../../core/constants';
import {timeago} from '../../core/utils';
import ReplyCard from './ReplyCard';

import './index.css';

const findById = (list, id) => list.find((data) => data.id === id);

export class TopicPage extends Component {

  constructor() {
    super(...arguments);
    this.replyUp = this.replyUp.bind(this);
  }

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

  replyUp(replyid) {
    const {match: {params: {topicid}}, replyUp, userMe} = this.props;
    const accesstoken = userMe.get('accesstoken');
    const userid = userMe.get('id');

    if (accesstoken) {
      replyUp({
        replyid,
        accesstoken,
        topicid,
        userid
      })
    }
  }

  render() {
    const {topicList, match: {params: {topicid: matchedId}}, userMe} = this.props;
    const finded = findById(topicList, matchedId);
    const userId = userMe.get('id');

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
          <div>
            <div className="topic_page_reply_count">{replies.length} 回复</div>
            {
              replies.map((reply, i) => <ReplyCard data={reply} key={i} i={i} replyUp={this.replyUp} userId={userId}/>)
            }
          </div>
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
  loadTopic: topicActions.loadTopic,
  replyUp: replyActions.replyUp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicPage);