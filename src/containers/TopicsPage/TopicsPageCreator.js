import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {List} from 'immutable';

import {topicActions} from '../../core/topic';
import TopicList from '../../components/TopicList';
import {getDBTopics, getDBUsers} from '../../core/db';
import {getTabTopicCreator} from '../../core/topic';

export default function (tab) {

  class TopicsBasePage extends Component {

    componentWillMount() {
      const {data, isPending, loadTopics} = this.props;

      if (!data && !isPending) {
        loadTopics({
          tab: tab
        });
      }
    }

    render() {
      const {data} = this.props;

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

  const mapStateToProps = createSelector(
    getDBTopics,
    getDBUsers,
    getTabTopicCreator(tab),
    (dbTopics, dbUsers, tabTopic) => {
      const tabTopicData = tabTopic.get('data');
      let topics = new List();

      if (!tabTopicData) {
        topics = false;
      } else {
        tabTopicData.forEach((d) => {
          const topic = dbTopics.get(d.get('id'));

          if (topic) {
            topics = topics.push(topic.set('author', dbUsers.get(topic.get('author'))));
          } else {
            topics = false;
            return false;
          }
        });
      }

      return {
        isPending: tabTopic.get('isPending'),
        data: topics
      }
    }
  );

  const mapDispatchToProps = {
    loadTopics: topicActions.loadTopics
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopicsBasePage);

};
