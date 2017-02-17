import React, {PropTypes} from "react";
import {Link} from 'react-router-dom';

import {timeago} from '../../core/utils';

import './ReplyCard.css';

const ReplyList = ({data, i}) => {
  const {author: {avatar_url, loginname}, content, ups, create_at} = data;
  const up = ups.length;

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
        <i className="iconfont reply_card_icon">&#xe605;</i>
        {!!up && <i className="reply_card_good_count">{up}</i>}
        <i className="iconfont reply_card_icon">&#xe65d;</i>
      </div>
      <div className="markdown-body reply_card_content" dangerouslySetInnerHTML={{__html: content}} />
    </div>
  )
};

ReplyList.propTypes = {
  data: PropTypes.object.isRequired
};

export default ReplyList;