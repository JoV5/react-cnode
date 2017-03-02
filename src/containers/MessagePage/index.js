import React, {Component} from "react";
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {List} from 'immutable';

import {messageActions, getStateMessage} from '../../core/message';
import MessageList from '../../components/MessageList';
import {getDBUsers, getDBTopics, getDBReplies, getDBMessages} from '../../core/db';
import {getAuth} from '../../core/auth';

import './index.css';

export class MessagePage extends Component {

  componentWillMount() {
    const {auth, loadMessages, messages, messageCount} = this.props;
    const accesstoken = auth.get('accesstoken');

    // 首次加载message或者有未读消息
    if (!messages || messageCount) {
      loadMessages({
        accesstoken
      });
    }
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
    const {messages} = this.props;

    if (messages) {
      return (
        <div className="message_page">
          <MessageList data={messages}/>
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
  getAuth,
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
      messages
    }
  }
);

const mapDispatchToProps = {
  loadMessages: messageActions.loadMessages,
  markAllMessage: messageActions.markAllMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePage);