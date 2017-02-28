import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {List, is} from 'immutable';

import {topicActions} from '../../core/topic';
import TopicCard from '../../components/TopicCard';
import PullView from '../../components/PullView';
import {getDBTopics, getDBUsers} from '../../core/db';
import {getTabTopicCreator} from '../../core/topic';
import {shallowEqual} from '../../core/utils';

const StatusText = ['↓ 下拉刷新', '↑ 释放更新', '加载中...'];

export default function (tab) {

  class TopicsBasePage extends Component {

    constructor() {
      super(...arguments);
      this.onPulling = this.onPulling.bind(this);
      this.onPullingPause = this.onPullingPause.bind(this);
      this.onPullEnd = this.onPullEnd.bind(this);
      this.onScrollToBottom = this.onScrollToBottom.bind(this);
      this.onPullViewUnmount = this.onPullViewUnmount.bind(this);
    }

    state = {
      pulledY: 0,
      status: 0, // 0：下拉刷新，1：释放刷新，2：加载中
      pausedY: 40,
      needStopPause: false
    };

    componentWillMount() {
      const {data, loadTopics} = this.props;

      if (!data) {
        loadTopics({
          tab: tab,
          page: 1
        });
      }
    }

    onPulling(pulledY) {
      if (pulledY > 40) {
        this.setState({
          pulledY,
          status: 1,
          needStopPause: false
        });
      } else {
        this.setState({
          pulledY,
          status: 0,
          needStopPause: false
        });
      }
    }

    onPullingPause(pulledY) {
      this.setState({
        pulledY: pulledY,
        status: 2,
        needStopPause: false
      });
    }


    onPullEnd(pulledY) {
      const {isReloading, loadTopics} = this.props;
      if (pulledY > 40) {
        this.setState({
          pulledY: 40,
          status: 2,
          needStopPause: false
        });

        if (!isReloading) {
          loadTopics({
            tab: tab,
            reload: true,
            page: 1
          });
        }
        return true;
      } else {
        this.setState({
          pulledY: 0,
          status: 0,
          needStopPause: false
        });
        return false;
      }
    }

    onScrollToBottom() {
      const {page, isPending, loadTopics} = this.props;

      if (!isPending) {
        loadTopics({
          tab: tab,
          page: page + 1
        });
      }
    }

    onPullViewUnmount(scrollTop) {
      const {saveScrollTop} = this.props;
      saveScrollTop(tab, scrollTop);
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.isReloading && this.props.isReloading && this.state.status === 2) {
        this.setState({
          status: 0,
          needStopPause: true,
          pulledY: 0
        })
      } else {
        this.setState({
          needStopPause: false
        })
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state) || !is(nextProps.data, this.props.data);
    }

    render() {
      const {props: {data, mountScrollTop}, state: {pulledY, needStopPause, status}} = this;

      return (
        <div style={{
          position: 'absolute',
          top: '42px',
          bottom: 0,
          width: '100%'
        }}>
          <div style={{
            position: 'absolute',
            top: '-25px',
            textAlign: 'center',
            width: '100%',
            transform: `translate3d(0px, ${pulledY}px, 0px)`
          }}>{StatusText[status]}</div>
          <PullView
            onPulling={this.onPulling}
            onPullEnd={this.onPullEnd}
            onPullingPause={this.onPullingPause}
            onScrollToBottom={this.onScrollToBottom}
            componentWillUnmount={this.onPullViewUnmount}
            mountScrollTop={mountScrollTop}
            toBottom={50}
            pulledPauseY={40}
            needStopPause={needStopPause}
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

      if (tabTopicIds.size) {
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
        isReloading: tabTopic.get('isReloading'),
        page: tabTopic.get('page'),
        data: topics,
        mountScrollTop: tabTopic.get('scrollTop')
      }
    }
  );

  const mapDispatchToProps = {
    loadTopics: topicActions.loadTopics,
    saveScrollTop: topicActions.saveScrollTop
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopicsBasePage);

};
