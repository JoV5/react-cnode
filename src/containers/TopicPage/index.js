import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createSelector} from 'reselect';
import marked from 'marked';

import {topicActions} from '../../core/topic';
import {replyActions} from '../../core/reply';
import {TAB_MAP} from '../../core/constants';
import {timeago} from '../../core/utils';
import ReplyCard from './ReplyCard';
import {getDBReplies, getDBUsers, getDBTopics} from '../../core/db';
import {getAuth} from '../../core/auth';
import {getMatchedTopicId} from '../../core/topic';

import './index.css';

export class TopicPage extends Component {

  constructor() {
    super(...arguments);
    this.replyUp = this.replyUp.bind(this);
  }

  componentWillMount() {
    const {matchedTopic, auth, loadTopic, matchedTopicId} = this.props;
    const accesstoken = auth.get('accesstoken');

    if (!matchedTopic || !matchedTopic.get('content')) {
      loadTopic({
        topicid: matchedTopicId,
        accesstoken: accesstoken ? accesstoken : ''
      });
    }

    // https://github.com/ReactTraining/react-router/issues/3950
    window.scrollTo(0, 0);
  }

  replyUp(replyid) {
    const {match: {params: {topicid}}, replyUp, auth} = this.props;
    const accesstoken = auth.get('accesstoken');
    const userid = auth.get('id');

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
    const {matchedTopic, auth, topicReplies, loadTopic, matchedTopicId} = this.props;
    const userId = auth.get('id');

    if (matchedTopic && matchedTopic.get('content')) {
      //const {good, tab, top, title, author: {loginname, avatar_url}, create_at, visit_count, replies, last_reply_at} = matchedTopic;
      const good = matchedTopic.get('good');
      const tab = matchedTopic.get('tab');
      const top = matchedTopic.get('top');
      const title = matchedTopic.get('title');
      const author = matchedTopic.get('author');
      const loginname = author.get('loginname');
      const avatar_url = author.get('avatar_url');
      const create_at = matchedTopic.get('create_at');
      const visit_count = matchedTopic.get('visit_count');
      const last_reply_at = matchedTopic.get('last_reply_at');
      const content = matchedTopic.get('content');
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
          <div className="markdown-body topic_page_content" dangerouslySetInnerHTML={{__html: marked(content)}}/>
          {
            topicReplies ?
              <div>
                <div className="topic_page_reply_count">{topicReplies.size} 回复</div>
                {
                  topicReplies.map((reply, i) =>
                    <ReplyCard data={reply} key={i} i={i} replyUp={this.replyUp} userId={userId}/>)
                }
              </div> :
              <div className="topic_page_load_replies" onClick={() => loadTopic({topicid: matchedTopicId})}>
                加载评论
              </div>
          }
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

const mapStateToProps = createSelector(
  getDBTopics,
  getDBUsers,
  getDBReplies,
  getMatchedTopicId,
  getAuth,
  (dbTopics, dbUsers, dbReplies, matchedTopicId, auth) => {
    let matchedTopic = dbTopics.get(matchedTopicId);
    let topicReplies = false;

    if (matchedTopic) {
      topicReplies = matchedTopic.get('replies');

      topicReplies &&
      (topicReplies =
        topicReplies
          .map((replyId) => {
            const reply = dbReplies.get(replyId);
            return reply.set('author', dbUsers.get(reply.get('author')))
          })
      );

      matchedTopic = matchedTopic.set('author', dbUsers.get(matchedTopic.get('author')));
    }

    return {
      auth,
      matchedTopic,
      matchedTopicId,
      topicReplies
    }
  }
);

const mapDispatchToProps = {
  loadTopic: topicActions.loadTopic,
  replyUp: replyActions.replyUp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicPage);