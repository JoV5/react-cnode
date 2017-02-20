import React, {PropTypes} from "react";
import {Link} from 'react-router-dom';

import {timeago} from '../../core/utils';

import './MessageCard.css';

const MessageCard = ({data}) => {
  const {author: {loginname, avatar_url}, reply: {content}, topic: {title, id}, create_at, has_read} = data;
  return (
    <div className="message_card">
      <div>
        <Link to={`/user/${loginname}`}>
          <img src={avatar_url} className="message_card_avatar" alt={loginname}/>
        </Link>
        {!has_read && <span className="message_card_read"/>}
      </div>
      <div className="message_card_info">
        <Link to={`/user/${loginname}`}>
          <span>{loginname}</span> <span className="message_card_other"> 回复了您的话题：</span>
          <span className="message_card_time">{timeago(create_at)}</span>
        </Link>
        <Link to={`/topic/${id}`}><span className="message_card_title">{title}</span></Link>
        <div className="markdown-body message_card_content" dangerouslySetInnerHTML={{__html: content}} />
      </div>
    </div>
  )
};

MessageCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default MessageCard;