import React, {PropTypes} from "react";
import {Link} from 'react-router-dom';
import marked from 'marked';

import {timeago} from '../../core/utils';

import './ReplyCard.css';

const ReplyCard = ({data, i, replyUp, userId, replyTopic, topicAuthor}) => {
  const author = data.get('author');
  const avatar_url = author.get('avatar_url');
  const loginname = author.get('loginname');
  const content = data.get('content');
  const ups = data.get('ups');
  const create_at = data.get('create_at');
  const id = data.get('id');
  const gooded = !!ups.find((upId) => upId === userId);
  const up = ups.size;

  return (
    <div className="reply_card">
      <div className="reply_card_info">
        <Link to={`/user/${loginname}`}>
          <img src={avatar_url} className="reply_card_avatar" alt={loginname}/>
        </Link>
        <Link to={`/user/${loginname}`}>
          <span>{loginname}</span>
        </Link>
        <span className="reply_card_time">{i + 1}楼 · {timeago(create_at)}</span>
        {topicAuthor === loginname && <span className="reply_by_author">作者</span>}
        <i className="iconfont reply_card_icon" onClick={() => replyTopic(id, loginname)}>&#xe605;</i>
        {!!up && <i className="reply_card_good_count">{up}</i>}
        <i className={`iconfont reply_card_icon ${gooded ? 'good' : ''}`} onClick={() => replyUp(id)}>&#xe65d;</i>
      </div>
      <div className="markdown-body reply_card_content" dangerouslySetInnerHTML={{__html: marked(content)}} />
    </div>
  )
};

ReplyCard.propTypes = {
  data: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  replyUp: PropTypes.func.isRequired,
  userId: PropTypes.string,
  replyTopic: PropTypes.func.isRequired,
  topicAuthor: PropTypes.string.isRequired
};

export default ReplyCard;