import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {createSelector} from 'reselect';
import marked from 'marked';

import {topicActions} from '../../core/topic';
import {replyActions} from '../../core/reply';
import {TAB_MAP} from '../../core/constants';
import {timeago} from '../../core/utils';
import ReplyList from '../../components/ReplyList';
import {getDBReplies, getDBUsers, getDBTopics} from '../../core/db';
import {getAuth} from '../../core/auth';
import {getMatchedTopicId} from '../../core/topic';
import {collectionActions} from '../../core/collection';

import './index.css';

export class TopicPage extends Component {

  constructor() {
    super(...arguments);
    this.replyUp = this.replyUp.bind(this);
    this.collectTopic = this.collectTopic.bind(this);
    this.decollectTopic = this.decollectTopic.bind(this);
  }

  componentWillMount() {
    const {matchedTopic, auth, loadTopic, matchedTopicId, needLoadCollections, loadCollections} = this.props;
    const accesstoken = auth.get('accesstoken');
    const loginname = auth.get('loginname');

    if (!matchedTopic || !matchedTopic.get('content')) {
      loadTopic({
        topicid: matchedTopicId,
        accesstoken: accesstoken ? accesstoken : ''
      });
    }

    if (needLoadCollections) {
      loadCollections({
        loginname
      })
    }

    // https://github.com/ReactTraining/react-router/issues/3950
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const {loadCollections, auth, needLoadCollections} = nextProps;
    const loginname = auth.get('loginname');

    if (needLoadCollections) {
      loadCollections({
        loginname
      })
    }
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

  collectTopic() {
    const {collectTopic, auth, matchedTopicId} = this.props;
    const accesstoken = auth.get('accesstoken');
    const loginname = auth.get('loginname');

    collectTopic({
      accesstoken,
      loginname,
      topic_id: matchedTopicId
    })
  }

  decollectTopic() {
    const {decollectTopic, auth, matchedTopicId} = this.props;
    const accesstoken = auth.get('accesstoken');
    const loginname = auth.get('loginname');

    decollectTopic({
      accesstoken,
      loginname,
      topic_id: matchedTopicId
    })

  }

  render() {
    const {props, decollectTopic, collectTopic, replyUp} = this;
    const {matchedTopic, auth, topicReplies, loadTopic, matchedTopicId, isCollect, goBack} = props;
    const userId = auth.get('id');

    if (matchedTopic && matchedTopic.get('content')) {
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
          <div className="topic_page_header">
            <i className="iconfont back" onClick={goBack}>&#xe6e6;</i>
            <i className="iconfont reply">&#xe605;</i>
            {
              isCollect ?
                <i className="iconfont collection" onClick={decollectTopic}>&#xe619;</i> :
                <i className="iconfont collection" onClick={collectTopic}>&#xe603;</i>
            }
          </div>
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
                <ReplyList data={topicReplies} replyUp={replyUp} userId={userId}/>
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
    let userMe = auth.get('loginname');
    let isCollect = false;
    let needLoadCollections = false;

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

      if (userMe) { // 若已登录
        let collections = dbUsers.get(userMe).get('collections');

        if (!collections) { // 已登录但从未加载过登录用户的collections
          needLoadCollections = true;
        } else {
          ~collections.indexOf(matchedTopicId) && (isCollect = true);
        }
      }
    }

    return {
      auth,
      matchedTopic,
      matchedTopicId,
      topicReplies,
      needLoadCollections,
      isCollect
    }
  }
);

const mapDispatchToProps = {
  loadTopic: topicActions.loadTopic,
  replyUp: replyActions.replyUp,
  loadCollections: collectionActions.loadCollections,
  collectTopic: collectionActions.collectTopic,
  decollectTopic: collectionActions.decollectTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicPage);