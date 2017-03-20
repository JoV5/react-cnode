import React, {Component} from "react";
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {collectionActions, getStateCollection} from '../../core/collection';
import {getDBUsers, getDBTopics} from '../../core/db';
import {getMatchedUserName} from '../../core/user';
import {getStateAuth} from '../../core/auth';
import {appActions, getAppNavIsShow} from '../../core/app';
import TopicList from '../../components/TopicList';
import PullViewWrap from '../../components/PullViewWrap';
import Loading from '../../components/Loading';
import {default_pulledPauseY, default_scaleY} from '../../core/constants';

import './index.css';

export class CollectionPage extends Component {

  constructor() {
    super(...arguments);
    this.onPullEnd = this.onPullEnd.bind(this);
    this.onPullViewUnmount = this.onPullViewUnmount.bind(this);
  }

  state = {
    toStopPause: false
  };

  componentWillMount() {
    const {loadCollections, matchedName, collections, toggleAppNav, appNavIsShow} = this.props;

    if (!collections) {
      loadCollections({
        loginname: matchedName
      });
    }

    !appNavIsShow && toggleAppNav(true);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isPendingCollections && this.props.isPendingCollections) {
      this.setState({
        toStopPause: true
      });
    } else {
      this.setState({
        toStopPause: false
      });
    }
  }

  componentDidUpdate() {
    if (this.state.toStopPause) {
      this.setState({
        toStopPause: false
      });
    }
  }

  onPullEnd() {
    const {isPendingCollections, loadCollections, matchedName} = this.props;

    if (!isPendingCollections) {
      loadCollections({
        loginname: matchedName
      });
    }
  }

  onPullViewUnmount(scrollTop) {
    const {saveScrollTop} = this.props;

    saveScrollTop(scrollTop);
  }

  render() {
    const {
      props: {collections, mountScrollTop},
      state: {toStopPause},
      onPullEnd,
      onPullViewUnmount
    } = this;

    if (collections) {
      return (
        <PullViewWrap
          styleClass="pull_view_wrap"
          statusDivStyleClass="pull_status_div"
          onPullEnd={onPullEnd}
          toStopPause={toStopPause}
          onPullViewUnmount={onPullViewUnmount}
          mountScrollTop={mountScrollTop}
          LoadingComponent={Loading}
          pulledPauseY={default_pulledPauseY}
          scaleY={default_scaleY}
          unit='rem'
        >
          <TopicList data={collections}/>
        </PullViewWrap>
      );
    } else {
      return (
        <Loading/>
      )
    }
  }
}

const collectionsSelector = createSelector(
  getDBTopics,
  getDBUsers,
  getStateAuth,
  getMatchedUserName,
  (dbTopics, dbUsers, auth, matchedName) => {
    matchedName = matchedName || auth.get('loginname');
    let collections = false;

    if (matchedName) {
      const matchedUser = dbUsers.get(matchedName);
      if (matchedUser) {
        collections = matchedUser.get('collections');

        if (collections) {
          collections = collections.map((collectionId) => {
            const collection = dbTopics.get(collectionId);

            return collection.set('author', dbUsers.get(collection.get('author')));
          });
        }
      }
    }

    return {
      matchedName,
      collections
    }
  }
);

const mapStateToProps = createSelector(
  collectionsSelector,
  getAppNavIsShow,
  getStateCollection,
  (collections, appNavIsShow, stateCollection) => ({
    ...collections,
    appNavIsShow,
    isPendingCollections: stateCollection.get('isPendingCollections'),
    mountScrollTop: stateCollection.get('scrollTop')
  })
);

const mapDispatchToProps = {
  loadCollections: collectionActions.loadCollections,
  toggleAppNav: appActions.toggleAppNav,
  saveScrollTop: collectionActions.saveScrollTop
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionPage);