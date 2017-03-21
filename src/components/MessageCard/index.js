import React, {PropTypes} from "react";
import {Link} from 'react-router-dom';
import marked from 'marked';

import {timeago} from '../../core/utils';

import './MessageCard.css';

const MessageCard = ({data}) => {
  const author = data.get('author');
  const loginname = author.get('loginname');
  const avatar_url = author.get('avatar_url');
  const content = data.getIn(['reply', 'content']);
  const topic = data.get('topic');
  const title = topic.get('title');
  const id = topic.get('id');
  const create_at = data.get('create_at');
  const has_read = data.get('has_read');
  const type = data.get('type');

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
          <span>{loginname}</span> <span className="message_card_other">{type === 'at' ? ' 在话题中@了您 ' : ' 回复了您的话题：'}</span>
          <span className="message_card_time">{timeago(create_at)}</span>
        </Link>
        <Link to={`/topic/${id}`}><span className="message_card_title">{title}</span></Link>
        <div className="markdown-body message_card_content" dangerouslySetInnerHTML={{__html: marked(content)}} />
      </div>
    </div>
  )
};

MessageCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default MessageCard;