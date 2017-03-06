import React, {Component} from "react";
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {List} from 'immutable';

import {messageActions, getStateMessage} from '../../core/message';
import MessageList from '../../components/MessageList';
import {getDBUsers, getDBTopics, getDBReplies, getDBMessages} from '../../core/db';
import {getStateAuth} from '../../core/auth';
import PullViewWrap from '../../components/PullViewWrap';
import {appActions} from '../../core/app';

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
    const {auth, loadMessages, messages, messageCount, toggleAppNav} = this.props;
    const accesstoken = auth.get('accesstoken');

    // 首次加载message或者有未读消息
    if (!messages || messageCount) {
      loadMessages({
        accesstoken
      });
    }

    toggleAppNav(true);
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
          >
            <MessageList data={messages}/>
          </PullViewWrap>
        </div>
      );
    } else {
      return (
        <div>
          加载中...
        </div>
      )
    }
  }
}

const mapStateToProps = createSelector(
  getStateMessage,
  getDBTopics,
  getDBUsers,
  getDBReplies,
  getDBMessages,
  getStateAuth,
  (stateMessage, dbTopics, dbUsers, dbReplies, dbMessages, auth) => {
    const messageCount = stateMessage.get('messageCount');
    let messagesIds = stateMessage.get('messages');
    let messages = false;

    if (messagesIds) {
      messages = new List();
      //messagesIds = messagesIds.map((message) => message.id);

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
          })
        })
      }
    }

    return {
      auth,
      messageCount,
      messages,
      isPendingMessages: stateMessage.get('isPendingMessages'),
      mountScrollTop: stateMessage.get('scrollTop')
    }
  }
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