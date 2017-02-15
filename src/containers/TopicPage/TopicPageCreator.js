import React, {Component} from 'react';
import {connect} from 'react-redux';

import {topicActions} from '../../core/topic';
import TopicList from '../../components/TopicList';

export default function (tab) {

  class TopicBasePage extends Component {

    componentWillMount() {
      const {stateData, loadTopic} = this.props;
      const data = stateData.get('data');
      const isPending = stateData.get('isPending');

      if (!data && !isPending) {
        loadTopic({
          tab: tab
        });
      }
    }

    render() {
      const {stateData} = this.props;
      const data = stateData.get('data');

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
      stateData: state.topic.get(tab)
    };
  };

  const mapDispatchToProps = {
    loadTopic: topicActions.loadTopic
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopicBasePage);

};
