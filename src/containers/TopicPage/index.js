import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'github-markdown-css';

import {topicActions} from '../../core/topic';

const findById = (list, id) => list.find((data) => data.id === id);

export class TopicPage extends Component {

  componentWillMount() {
    const {topicList, userMe, loadTopic, match: {params: {topicid: matchedId}}} = this.props;
    const finded = findById(topicList, matchedId);
    const accesstoken = userMe.get('accesstoken');

    if (!finded || (finded && !finded.content && !finded.isPending)) {
      loadTopic({
        topicid: matchedId,
        accesstoken: accesstoken ? accesstoken : ''
      })
    }
  }

  render() {
    const {topicList, match: {params: {topicid: matchedId}}} = this.props;
    const finded = findById(topicList, matchedId);

    if (finded) {
      return (
        <div className="markdown-body" dangerouslySetInnerHTML={{__html: finded.content}} />
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

const mapStateToProps = (state) => {
  return {
    topicList: state.topic.get('list'),
    userMe: state.user.get('me')
  };
};

const mapDispatchToProps = {
  loadTopic: topicActions.loadTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicPage);