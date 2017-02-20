import React, {Component} from "react";
import {connect} from 'react-redux';

import {messageActions} from '../../core/message';
import MessageCard from './MessageCard';

import './index.css';

export class MessagePage extends Component {

  componentWillMount() {
    const {userMe, loadMessages, message} = this.props;
    const accesstoken = userMe.get('accesstoken');
    const messageCount = message.get('messageCount');
    const messages = message.get('messages');

    // 首次加载message或者有未读消息
    if (!messages || messageCount) {
      loadMessages({
        accesstoken
      });
    }
  }

  componentWillUnmount() {
    const {userMe, markAllMessage, message} = this.props;
    const accesstoken = userMe.get('accesstoken');
    const messageCount = message.get('messageCount');

    // 在退出页面时，若有未读消息，标记未读消息为已读
    if (messageCount) {
      markAllMessage({
        accesstoken
      });
    }
  }

  render() {
    const {message} = this.props;
    const messages = message.get('messages');
    if (messages) {
      return (
        <div className="message_page">
          {
            messages.map((message, i) => {
              return <MessageCard data={message} key={i}/>
            })
          }
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

const mapStateToProps = (state) => {
  return {
    message: state.message,
    userMe: state.user.get('me')
  };
};

const mapDispatchToProps = {
  loadMessages: messageActions.loadMessages,
  markAllMessage: messageActions.markAllMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePage);