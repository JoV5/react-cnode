import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {List} from 'immutable';

import {topicActions} from '../../core/topic';
import TopicList from '../../components/TopicList';
import PullViewWrap from '../../components/PullViewWrap';
import {getDBTopics, getDBUsers} from '../../core/db';
import {getTabTopicCreator} from '../../core/topic';
import TopicsHeader from './TopicsHeader';
import {appActions} from '../../core/app';

import './index.css';

export default function (tab) {

  class TopicsBasePage extends Component {

    constructor() {
      super(...arguments);
      this.onPullEnd = this.onPullEnd.bind(this);
      this.onScrollToBottom = this.onScrollToBottom.bind(this);
      this.onScrollUp = this.onScrollUp.bind(this);
      this.onScrollDown = this.onScrollDown.bind(this);
      this.onPullViewUnmount = this.onPullViewUnmount.bind(this);
      this.toggleTopicsNav = this.toggleTopicsNav.bind(this);
    }

    state = {
      topicsNavIsShow: false,
      topicsHeaderIsShow: true,
      toStopPause: false
    };

    componentWillMount() {
      const {data, loadTopics, saveSelectedTab, toggleAppNav} = this.props;

      saveSelectedTab(tab);

      if (!data) {
        loadTopics({
          tab: tab,
          page: 1
        });
      }

      toggleAppNav(true);
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.isReloading && this.props.isReloading) {
        this.setState({
          toStopPause: true
        });
      } else {
        this.setState({
          toStopPause: false
        });
      }
    }

    onPullEnd() {
      const {isReloading, loadTopics} = this.props;

      if (!isReloading) {
        loadTopics({
          tab: tab,
          reload: true,
          page: 1
        });
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

    onScrollUp() {
      const {topicsHeaderIsShow} = this.state;

      topicsHeaderIsShow && this.toggleTopicsHeader(false);
    }

    onScrollDown() {
      const {topicsHeaderIsShow} = this.state;

      !topicsHeaderIsShow && this.toggleTopicsHeader(true);
    }

    onPullViewUnmount(scrollTop) {
      const {saveScrollTop} = this.props;

      saveScrollTop(tab, scrollTop);
    }

    toggleTopicsHeader(bool) {
      this.setState({
        topicsHeaderIsShow: bool
      });
    }

    toggleTopicsNav() {
      const {topicsNavIsShow} = this.state;

      this.setState({
        topicsNavIsShow: !topicsNavIsShow
      });
    }

    render() {
      const {
        props: {data, mountScrollTop},
        state: {topicsNavIsShow, topicsHeaderIsShow, toStopPause},
        toggleTopicsNav,
        onPullEnd
      } = this;

      return (
        <div className="topics_page">
          <TopicsHeader
            tab={tab}
            toggleTopicsNav={toggleTopicsNav}
            topicsNavIsShow={topicsNavIsShow}
            topicsHeaderIsShow={topicsHeaderIsShow}/>
          <PullViewWrap
            onPullEnd={onPullEnd}
            toStopPause={toStopPause}
            onScrollUp={this.onScrollUp}
            onScrollDown={this.onScrollDown}
            onScrollToBottom={this.onScrollToBottom}
            onPullViewUnmount={this.onPullViewUnmount}
            mountScrollTop={mountScrollTop}
            statusDivStyleClass="topics_page_pull_status_div"
          >
            {data && <TopicList data={data}/>}
            <div className="load_more_info">加载中...</div>
          </PullViewWrap>
        </div>
      )
    }
  }

  let lastTopics = false;

  const mapStateToProps = createSelector(
    getDBTopics,
    getDBUsers,
    getTabTopicCreator(tab),
    (dbTopics, dbUsers, tabTopic) => {
      let tabTopicIds = tabTopic.get('data');
      let topics = lastTopics;

      if (tabTopicIds.size) {
        topics = new List();

        tabTopicIds.forEach((topicId, index) => {
          const topic = dbTopics.get(topicId);

          if (topic) {
            topics = topics.set(index, topic.set('author', dbUsers.get(topic.get('author'))));
          } else {
            topics = lastTopics;
            return false;
          }
        });
      }

      lastTopics = topics;

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
    saveScrollTop: topicActions.saveScrollTop,
    saveSelectedTab: topicActions.saveSelectedTab,
    toggleAppNav: appActions.toggleAppNav
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopicsBasePage);

};
