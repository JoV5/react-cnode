import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {topicActions} from '../../core/topic';
import {replyActions} from '../../core/reply';
import ReplyList from '../../components/ReplyList';
import {getDBReplies, getDBUsers, getDBTopics} from '../../core/db';
import {getAuth} from '../../core/auth';
import {getMatchedTopicId} from '../../core/topic';
import {collectionActions} from '../../core/collection';
import {appActions} from '../../core/app';
import TopicContent from './TopicContent';

import './index.css';

export class TopicPage extends Component {

  constructor() {
    super(...arguments);
    this.replyUp = this.replyUp.bind(this);
    this.collectTopic = this.collectTopic.bind(this);
    this.decollectTopic = this.decollectTopic.bind(this);
  }

  componentWillMount() {
    const {matchedTopic, auth, loadTopic, matchedTopicId, needLoadCollections, loadCollections, toggleAppNav} = this.props;
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

    toggleAppNav(false);

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

    return (
      <div className="topic_page">
        <div className="topic_page_header">
          <i className="iconfont topic_back" onClick={goBack}>&#xe6e6;</i>
          <i className="iconfont topic_reply">&#xe605;</i>
          {
            isCollect ?
              <i className="iconfont topic_collection" onClick={decollectTopic}>&#xe619;</i> :
              <i className="iconfont topic_collection" onClick={collectTopic}>&#xe603;</i>
          }
        </div>
        <TopicContent topic={matchedTopic}/>
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
  decollectTopic: collectionActions.decollectTopic,
  toggleAppNav: appActions.toggleAppNav
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicPage);