import React, {PropTypes} from "react";
import {Link} from 'react-router-dom';

import {timeago} from '../../core/utils';

import './index.css';

const RecentCard = ({data}) => {
  const author = data.get('author');
  const avatar_url = author.get('avatar_url');
  const loginname = author.get('loginname');
  const title = data.get('title');
  const last_reply_at = data.get('last_reply_at');
  const id = data.get('id');

  return (
    <div className="recent_card">
      <Link to={`/user/${loginname}`}>
        <img src={avatar_url} className="recent_card_avatar" alt={loginname}/>
      </Link>
      <Link to={`/topic/${id}`}>
        <h3 className="recent_card_title">
          {title}
        </h3>
        <div className="recent_card_other">
          <span>{loginname}</span>
          <span className="float_right"><b>{timeago(last_reply_at)}</b></span>
        </div>
      </Link>
    </div>
  )
};

RecentCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default RecentCard;