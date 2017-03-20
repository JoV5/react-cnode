import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {topicActions} from '../../core/topic';
import {replyActions} from '../../core/reply';
import ReplyList from '../../components/ReplyList';
import {getDBReplies, getDBUsers, getDBTopics} from '../../core/db';
import {getStateAuth} from '../../core/auth';
import {getMatchedTopicId, getIsPendingTopic} from '../../core/topic';
import {collectionActions} from '../../core/collection';
import {appActions} from '../../core/app';
import TopicContent from './TopicContent';
import Loading from '../../components/Loading'
import PullViewWrap from '../../components/PullViewWrap';
import {default_pulledPauseY, default_scaleY} from '../../core/constants';

import './index.css';

export class TopicPage extends Component {

  constructor() {
    super(...arguments);
    this.replyUp = this.replyUp.bind(this);
    this.collectTopic = this.collectTopic.bind(this);
    this.decollectTopic = this.decollectTopic.bind(this);
    this.loadTopic = this.loadTopic.bind(this);
    this.replyTopic = this.replyTopic.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  state = {
    toStopPause: false
  };

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
      });
    }
    
    if (!nextProps.isPendingTopic && this.props.isPendingTopic) {
      this.setState({
        toStopPause: true
      });
    } else {
      this.setState({
        toStopPause: false
      });
    }
  }

  componentDidUpdate() {
    if (this.state.toStopPause) {
      this.setState({
        toStopPause: false
      });
    }
  }

  componentWillUnmount() {
    const {cancelLoadTopic, isPendingTopic} = this.props;

    isPendingTopic && cancelLoadTopic();
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
    } else {
      this.redirectToLogin();
    }
  }

  collectTopic() {
    const {collectTopic, auth, matchedTopicId} = this.props;
    const accesstoken = auth.get('accesstoken');
    const loginname = auth.get('loginname');

    if (accesstoken) {
      collectTopic({
        accesstoken,
        loginname,
        topic_id: matchedTopicId
      });
    } else {
      this.redirectToLogin();
    }
  }

  decollectTopic() {
    const {decollectTopic, auth, matchedTopicId} = this.props;
    const accesstoken = auth.get('accesstoken');
    const loginname = auth.get('loginname');
    
    if (accesstoken) {
      decollectTopic({
        accesstoken,
        loginname,
        topic_id: matchedTopicId
      });
    } else {
      this.redirectToLogin();
    }

  }

  loadTopic() {
    const {isPendingTopic, loadTopic, matchedTopicId} = this.props;

    if (!isPendingTopic) {
      loadTopic({topicid: matchedTopicId});
    }
  }
  
  replyTopic(reply_id, username) {
    const {toggleReplyBox, matchedTopicId, auth} = this.props;
    const accesstoken = auth.get('accesstoken');

    if (accesstoken) {
      toggleReplyBox({
        show: true,
        topic_id: matchedTopicId,
        reply_id,
        replyTo: username
      });

    } else {
      this.redirectToLogin();
    }
  }

  redirectToLogin() {
    const {matchedTopicId, history} = this.props;
    
    history.replace('/login', {
      from: `/topic/${matchedTopicId}`
    });
  }

  render() {
    const {props, decollectTopic, collectTopic, replyUp, loadTopic, state, replyTopic} = this;
    const {matchedTopic, auth, topicReplies, isCollect, history: {goBack}, isPendingTopic} = props;
    const {toStopPause} = state;
    const userId = auth.get('id');
    
    return (
      <div className="topic_page">
        <div className="topic_page_header">
          <i className="iconfont float_left" onClick={goBack}>&#xe6e6;</i>
          <i className="iconfont topic_reply" onClick={() => replyTopic()}>&#xe605;</i>
          {
            isCollect ?
              <i className="iconfont float_right" onClick={decollectTopic}>&#xe619;</i> :
              <i className="iconfont float_right" onClick={collectTopic}>&#xe603;</i>
          }
        </div>
        <PullViewWrap
          onPullEnd={loadTopic}
          toStopPause={toStopPause}
          statusDivStyleClass="topic_page_pull_status_div"
          LoadingComponent={Loading}
          scaleY={default_scaleY}
          pulledPauseY={default_pulledPauseY}
        >
          <TopicContent topic={matchedTopic}/>
          {
            topicReplies ?
              <div>
                <div className="topic_page_reply_count">{topicReplies.size} 回复</div>
                <ReplyList 
                  data={topicReplies} 
                  replyUp={replyUp} 
                  userId={userId} 
                  replyTopic={replyTopic} 
                  topicAuthor={matchedTopic && matchedTopic.getIn(['author', 'loginname'])}
                />
              </div> :
              isPendingTopic ?
                <Loading/> :
                <div className="topic_page_load_replies" onClick={loadTopic}>
                  加载评论
                </div>
          }
        </PullViewWrap>
      </div>
    )
  }
}

const mapStateToProps = createSelector(
  getDBTopics,
  getDBUsers,
  getDBReplies,
  getMatchedTopicId,
  getStateAuth,
  getIsPendingTopic,
  (dbTopics, dbUsers, dbReplies, matchedTopicId, auth, isPendingTopic) => {
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
      isCollect,
      isPendingTopic
    }
  }
);

const mapDispatchToProps = {
  loadTopic: topicActions.loadTopic,
  cancelLoadTopic: topicActions.cancelLoadTopic,
  replyUp: replyActions.replyUp,
  loadCollections: collectionActions.loadCollections,
  collectTopic: collectionActions.collectTopic,
  decollectTopic: collectionActions.decollectTopic,
  toggleAppNav: appActions.toggleAppNav,
  toggleReplyBox: replyActions.toggleReplyBox
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicPage);