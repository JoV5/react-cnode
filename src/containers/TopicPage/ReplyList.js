import React, {PropTypes} from "react";
import {Link} from 'react-router-dom';

import {timeago} from '../../core/utils';

import './ReplyList.css';

const ReplyList = ({data}) => (
  <div>
    {
      data.map((reply, i) => {
        const {author: {avatar_url, loginname}, content, ups, create_at} = reply;
        const up = ups.length;
        return (
          <div key={i} className="reply_item">
            <div className="reply_item_info">
              <Link to={`/user/${loginname}`}>
                <img src={avatar_url} className="reply_item_avatar" alt={loginname}/>
              </Link>
              <Link to={`/user/${loginname}`}>
                <span>{loginname}</span>
              </Link>
              <span className="reply_item_time">{i + 1}楼 · {timeago(create_at)}</span>
              <i className="iconfont reply_item_icon">&#xe605;</i>
              {!!up && <i className="reply_item_good_count">{up}</i>}
              <i className="iconfont reply_item_icon">&#xe65d;</i>
            </div>
            <div className="markdown-body reply_item_content" dangerouslySetInnerHTML={{__html: content}} />
          </div>
        )
      })
    }
  </div>
);

ReplyList.propTypes = {
  data: PropTypes.array.isRequired
};

export default ReplyList;