import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {appActions} from '../../core/app';
import {topicActions} from '../../core/topic';
import {getStateAuth} from '../../core/auth';
import {getIsPostingTopic} from '../../core/topic';

import './index.css';

export class NewTopicPage extends Component {
  
  constructor() {
    super(...arguments);
    this.handlePost = this.handlePost.bind(this);
  }

  componentWillMount() {
    const {toggleAppNav} = this.props;
    
    toggleAppNav(false);
  }
  
  handlePost() {
    const {tab, content, title, props: {postTopic, auth}} = this;
    const accesstoken = auth.get('accesstoken');
    
    postTopic({
      accesstoken,
      tab: tab.value,
      title: title.value,
      content: content.value
    });
  }

  render() {
    const {isPostingTopic, history: {goBack}} = this.props;
    
    return (
      <div className="new_topic_page">
        <div className="new_topic_page_header">
          <i className="iconfont float_left" onClick={goBack}>&#xe6e6;</i>
        </div>
        <div className="new_topic_page_head">
          选择版块：
          <select className="new_topic_page_type" ref={(tab) => this.tab = tab}>
            <option value="share">分享</option>
            <option value="ask">问答</option>
            <option value="job">招聘</option>
          </select>
          {
            isPostingTopic ?
              <span className="new_topic_page_submit">提交中</span> : 
              <span className="new_topic_page_submit" onClick={this.handlePost}>提交</span>
          }
        </div>
        <div className="new_topic_page_title_wrap">
          <input placeholder="标题字数10字以上" className="new_topic_page_title" ref={(title) => this.title = title}/>
        </div>
        <textarea placeholder="正文内容" className="new_topic_page_content" rows="30" ref={(content) => this.content = content}/>
      </div>
    )
  }
}

const mapStateToProps = createSelector(
  getStateAuth,
  getIsPostingTopic,
  (auth, isPostingTopic) => ({
    auth,
    isPostingTopic
  })
);

const mapDispatchToProps = {
  toggleAppNav: appActions.toggleAppNav,
  postTopic: topicActions.postTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTopicPage);