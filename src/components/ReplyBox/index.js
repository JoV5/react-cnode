import React, {Component, PropTypes} from "react";

import './index.css';

export default class ReplyBox extends Component {
  
  constructor(){
    super(...arguments);
    this.sendReply = this.sendReply.bind(this);
    this.hideReplyBox = this.hideReplyBox.bind(this);
  }

  static propTypes = {
    postReply: PropTypes.func.isRequired,
    reply: PropTypes.object.isRequired,
    toggleReplyBox: PropTypes.func.isRequired,
    accesstoken: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  };
  
  sendReply() {
    const {postReply, reply, accesstoken, author} = this.props;
    const topic_id = reply.get('topic_id');
    const reply_id = reply.get('reply_id');
    const content = this.content.value;

    postReply({
      accesstoken,
      topic_id,
      content,
      reply_id,
      author
    });
  }

  hideReplyBox() {
    const {toggleReplyBox, history} = this.props;

    toggleReplyBox({
      show: false
    });
    
    history.goBack();
    
    this.content.value = '';
  }

  render() {
    const {reply} = this.props;
    const show = reply.get('show');
    const replyTo = reply.get('replyTo');
    
    if (replyTo) {
      this.content.value = `@${replyTo} `;
    }
    
    return (
      <div className={`reply_box ${show ? 'show' : ''}`}>
        <div className="reply_box_back" onClick={this.hideReplyBox}></div>
        <div className="reply_box_send">
          <i className="iconfont float_right" onClick={this.sendReply}>&#xe600;</i>
        </div>
        <textarea placeholder="回复内容" className="reply_box_input" rows="30" ref={(content) => this.content = content}/>
      </div>
    );
  }
}