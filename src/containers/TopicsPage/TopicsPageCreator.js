import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {List} from 'immutable';

import {topicActions} from '../../core/topic';
import TopicCard from '../../components/TopicCard';
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
        return (
          <div>
            {
              data.map((topic, i) => (
                <TopicCard data={topic} key={i}/>
              ))
            }
          </div>
        );
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
      let tabTopicIds = tabTopic.get('data');
      let topics = false;

      if (tabTopicIds) {
        tabTopicIds = tabTopicIds.map((topic) => topic.get('id'));
        topics = new List();

        tabTopicIds.forEach((topicId, index) => {
          const topic = dbTopics.get(topicId);

          if (topic) {
            topics = topics.set(index, topic.set('author', dbUsers.get(topic.get('author'))));
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
