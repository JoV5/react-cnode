import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import marked from 'marked';
import {is} from 'immutable';

import {TAB_MAP} from '../../core/constants';
import {timeago} from '../../core/utils';

import './index.css';

export default class TopicContent extends Component {
  
  shouldComponentUpdate(nextProps) {
    return !is(nextProps.topic, this.props.topic);
  }

  render() {
    const {props} = this;
    const {topic} = props;

    if (topic && topic.get('content')) {
      const good = topic.get('good');
      const tab = topic.get('tab');
      const top = topic.get('top');
      const title = topic.get('title');
      const author = topic.get('author');
      const loginname = author.get('loginname');
      const avatar_url = author.get('avatar_url');
      const create_at = topic.get('create_at');
      const visit_count = topic.get('visit_count');
      const last_reply_at = topic.get('last_reply_at');
      const content = topic.get('content');
      const realTab = top ? 'top' : (good ? 'good' : tab);

      return (
        <div>
          <h3 className="topic_page_title">
            <span className={`topic_page_title_tab ${realTab}`}>{TAB_MAP[realTab]}</span>
            <span className="topic_page_title_content">{title}</span>
          </h3>
          <div className="topic_page_info">
            <Link to={`/user/${loginname}`}>
              <img src={avatar_url} className="topic_page_info_avatar" alt={loginname}/>
            </Link>
            <div className="topic_page_info_other">
              <div>
                <span>{loginname}</span>
                <span className="float_right">{visit_count} 次浏览</span>
              </div>
              <div>
                <span>发布于 {timeago(create_at)}</span>
                <span className="float_right">最后回复于 {timeago(last_reply_at)}</span>
              </div>
            </div>
          </div>
          <div className="markdown-body topic_page_content" dangerouslySetInnerHTML={{__html: marked(content)}}/>
        </div>
      )
    } else {
      return (
        <div>
          加载中..
        </div>
      );
    }
  }
}