import React, {PropTypes} from "react";
import {Link} from 'react-router-dom';

import {timeago} from '../../core/utils';
import {TAB_MAP} from '../../core/constants';

import './index.css';

const TopicCard = ({data}) => {
  const author = data.get('author'),
    loginname = author.get('loginname'),
    avatar_url = author.get('avatar_url'),
    last_reply_at = data.get('last_reply_at'),
    top = data.get('top'),
    tab = data.get('tab'),
    create_at = data.get('create_at'),
    title = data.get('title'),
    reply_count = data.get('reply_count'),
    id = data.get('id'),
    visit_count = data.get('visit_count'),
    good = data.get('good');

  const realTab = top ? 'top' : (good ? 'good' : tab);

  return (
    <div className="topic_card">
      <Link to={`/user/${loginname}`}>
        <img src={avatar_url} className="topic_card_avatar" alt={loginname}/>
      </Link>
      <Link to={`/topic/${id}`} >
        <h3 className="topic_card_title">
          <span className={`topic_card_title_tab ${realTab}`}>{TAB_MAP[realTab]}</span>
          <span className="topic_card_title_content">{title}</span>
        </h3>
        <div className="topic_card_other">
          <div>
            <span>{loginname}</span>
            <span className="float_right"><b>{reply_count}</b>{`/${visit_count}`}</span>
          </div>
          <div>
            <span>{timeago(create_at)}</span>
            <span className="float_right">{timeago(last_reply_at)}</span>
          </div>
        </div>
      </Link>
    </div>
  )
};

TopicCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default TopicCard;