import React, {PropTypes} from "react";
import {Link} from 'react-router-dom';

import {timeago} from '../../core/utils';

import './RecentList.css';

const RecentList = ({data}) => (
  <div>
    {
      data.map((recent, i) => {
        const {author: {avatar_url, loginname}, title, last_reply_at, id} = recent;
        return (
          <div key={i} className="recent_item">
            <Link to={`/user/${loginname}`}>
              <img src={avatar_url} className="recent_item_avatar" alt={loginname}/>
            </Link>
            <Link to={`/topic/${id}`}>
              <h3 className="recent_item_title">
                {title}
              </h3>
              <div className="recent_item_other">
                <span>{loginname}</span>
                <span className="float_right"><b>{timeago(last_reply_at)}</b></span>
              </div>
            </Link>
          </div>
        )
      })
    }
  </div>
);

RecentList.propTypes = {
  data: PropTypes.array.isRequired
};

export default RecentList;