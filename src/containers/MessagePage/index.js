import React, {Component} from "react";
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {List} from 'immutable';

import {messageActions, getStateMessage, getMessages} from '../../core/message';
import MessageList from '../../components/MessageList';
import {getDBUsers, getDBTopics, getDBReplies, getDBMessages} from '../../core/db';
import {getStateAuth} from '../../core/auth';
import PullViewWrap from '../../components/PullViewWrap';
import {appActions, getAppNavIsShow} from '../../core/app';
import Loading from '../../components/Loading';

import './index.css';

export class MessagePage extends Component {

  constructor() {
    super(...arguments);
    this.onPullEnd = this.onPullEnd.bind(this);
    this.onPullViewUnmount = this.onPullViewUnmount.bind(this);
  }

  state = {
    toStopPause: false
  };

  componentWillMount() {
    const {auth, loadMessages, messages, messageCount, toggleAppNav, appNavIsShow} = this.props;
    const accesstoken = auth.get('accesstoken');

    // 首次加载message或者有未读消息
    if (!messages || messageCount) {
      loadMessages({
        accesstoken
      });
    }

    !appNavIsShow && toggleAppNav(true);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isPendingMessages && this.props.isPendingMessages) {
      this.setState({
        toStopPause: true
      });
    } else {
      this.setState({
        toStopPause: false
      });
    }
  }

  onPullEnd() {
    const {isPendingMessages, loadMessages, auth} = this.props;
    const accesstoken = auth.get('accesstoken');

    if (!isPendingMessages) {
      loadMessages({
        accesstoken
      });
    }
  }

  onPullViewUnmount(scrollTop) {
    const {saveScrollTop} = this.props;

    saveScrollTop(scrollTop);
  }

  componentWillUnmount() {
    const {auth, markAllMessage, messageCount} = this.props;
    const accesstoken = auth.get('accesstoken');

    // 在退出页面时，若有未读消息，标记未读消息为已读
    if (messageCount) {
      markAllMessage({
        accesstoken
      });
    }
  }

  render() {
    const {
      props: {messages, mountScrollTop},
      state: {toStopPause},
      onPullEnd,
      onPullViewUnmount
    } = this;

    if (messages) {
      return (
        <div>
          <PullViewWrap
            onPullEnd={onPullEnd}
            toStopPause={toStopPause}
            onPullViewUnmount={onPullViewUnmount}
            mountScrollTop={mountScrollTop}
            statusDivStyleClass="message_page_pull_status_div"
            LoadingComponent={Loading}
          >
            <MessageList data={messages}/>
          </PullViewWrap>
        </div>
      );
    } else {
      return (
        <Loading/>
      )
    }
  }
}

const messagesSelector = createSelector(
  getMessages,
  getDBTopics,
  getDBUsers,
  getDBReplies,
  getDBMessages,
  (messagesIds, dbTopics, dbUsers, dbReplies, dbMessages) => {
    let messages = false;

    if (messagesIds) {
      messages = new List();

      messagesIds.forEach((messagesId, index) => {
        const message = dbMessages.get(messagesId);

        if (message) {
          messages = messages.set(index, message);
        } else {
          messages = false;
          return false;
        }
      });

      if (messages) {
        messages = messages.map((message) => {
          return message.merge({
            author: dbUsers.get(message.get('author')),
            reply: dbReplies.get(message.get('reply')),
            topic: dbTopics.get(message.get('topic'))
          });
        })
      }
    }

    return messages;
  }
);

const mapStateToProps = createSelector(
  getStateMessage,
  messagesSelector,
  getStateAuth,
  getAppNavIsShow,
  (stateMessage, messages, auth, appNavIsShow) => ({
    auth,
    messageCount: stateMessage.get('messageCount'),
    messages,
    isPendingMessages: stateMessage.get('isPendingMessages'),
    mountScrollTop: stateMessage.get('scrollTop'),
    appNavIsShow
  })
);

const mapDispatchToProps = {
  loadMessages: messageActions.loadMessages,
  markAllMessage: messageActions.markAllMessage,
  saveScrollTop: messageActions.saveScrollTop,
  toggleAppNav: appActions.toggleAppNav
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePage);