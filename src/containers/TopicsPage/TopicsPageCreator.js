import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {List} from 'immutable';

import {topicActions} from '../../core/topic';
import TopicCard from '../../components/TopicCard';
import PullView from '../../components/PullView';
import {getDBTopics, getDBUsers} from '../../core/db';
import {getTabTopicCreator} from '../../core/topic';

export default function (tab) {

  class TopicsBasePage extends Component {

    constructor() {
      super(...arguments);
      this.onPulling = this.onPulling.bind(this);
      this.onPullEnd = this.onPullEnd.bind(this);
    }

    state = {
      pulledY: 0,
      text: '下拉刷新'
    };

    componentWillMount() {
      const {data, isPending, loadTopics} = this.props;

      if (!data && !isPending) {
        loadTopics({
          tab: tab
        });
      }
    }

    onPulling(pulledY) {
      if (pulledY > 40) {
        this.setState({
          pulledY,
          text: '释放更新'
        });
      } else {
        this.setState({
          pulledY,
          text: '下拉刷新'
        });
      }
    }


    onPullEnd(pulledY) {
      if (pulledY > 40) {
        this.setState({
          pulledY: 40,
          text: '加载中'
        });
        return true;
      } else {
        this.setState({
          pulledY: 0
        });
        return false;
      }
    }

    render() {
      const {props: {data}, state: {pulledY, text}} = this;

      return (
        <div style={{
          position: 'absolute',
          height: '100%',
          width: '100%'
        }}>
          <div style={{
            position: 'absolute',
            top: '-25px',
            textAlign: 'center',
            width: '100%',
            transform: `translate3d(0px, ${pulledY}px, 0px)`
          }}>{text}</div>
          <PullView
            onPulling={this.onPulling}
            onPullEnd={this.onPullEnd}
            pulledPauseY={40}
          >
            {
              data && data.map((topic, i) => (
                <TopicCard data={topic} key={i}/>
              ))
            }
          </PullView>
        </div>
      )
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
