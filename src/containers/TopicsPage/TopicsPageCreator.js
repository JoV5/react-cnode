import React, {Component} from 'react';
import {connect} from 'react-redux';

import {topicActions} from '../../core/topic';
import TopicList from '../../components/TopicList';

export default function (tab) {

  class TopicsBasePage extends Component {

    componentWillMount() {
      const {topicTabData, loadTopics} = this.props;
      const data = topicTabData.get('data');
      const isPending = topicTabData.get('isPending');

      if (!data && !isPending) {
        loadTopics({
          tab: tab
        });
      }
    }

    render() {
      const {topicTabData} = this.props;
      const data = topicTabData.get('data');

      if (data) {
        return <TopicList data={data}/>;
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
      topicTabData: state.topic.get(tab)
    };
  };

  const mapDispatchToProps = {
    loadTopics: topicActions.loadTopics
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopicsBasePage);

};
