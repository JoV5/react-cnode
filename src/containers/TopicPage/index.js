import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createSelector} from 'reselect';
import {List} from 'immutable';

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
    const {matchTopic, auth, loadTopic, matchedId} = this.props;
    const accesstoken = auth.get('accesstoken');

    if (!matchTopic) {
      loadTopic({
        topicid: matchedId,
        accesstoken: accesstoken ? accesstoken : ''
      });
    }

    // TODO rr4 has some problem with scroll position
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
    const {matchTopic, auth} = this.props;
    const userId = auth.get('id');

    if (matchTopic) {
      //const {good, tab, top, title, author: {loginname, avatar_url}, create_at, visit_count, replies, last_reply_at} = matchTopic;
      const good = matchTopic.get('good');
      const tab = matchTopic.get('tab');
      const top = matchTopic.get('top');
      const title = matchTopic.get('title');
      const author = matchTopic.get('author');
      const loginname = author.get('loginname');
      const avatar_url = author.get('avatar_url');
      const create_at = matchTopic.get('create_at');
      const visit_count = matchTopic.get('visit_count');
      const replies = matchTopic.get('replies');
      const last_reply_at = matchTopic.get('last_reply_at');
      const content = matchTopic.get('content');
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
          <div className="markdown-body topic_page_content" dangerouslySetInnerHTML={{__html: content}}/>
          {
            replies !== false ?
              <div>
                <div className="topic_page_reply_count">{replies.size} 回复</div>
                {
                  replies.map((reply, i) => <ReplyCard data={reply} key={i} i={i} replyUp={this.replyUp} userId={userId}/>)
                }
              </div> :
              <div>
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
  (dbTopics, dbUsers, dbReplies, matchedId, auth) => {
    let matchTopic = dbTopics.get(matchedId);

    if (matchTopic) {
      const matchTopicReplies = matchTopic.get('replies');
      let replies;

      if (matchTopicReplies) {
        replies = new List();
        matchTopicReplies.forEach((d) => {
          const reply = dbReplies.get(d);

          replies = replies.push(reply.set('author', dbUsers.get(reply.get('author'))));
        });
      } else {
        replies = false
      }

      matchTopic = matchTopic.merge({
        author: dbUsers.get(matchTopic.get('author')),
        replies
      });
    }

    return {
      auth,
      matchTopic,
      matchedId
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