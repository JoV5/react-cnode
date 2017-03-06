import React, {Component} from "react";
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {collectionActions} from '../../core/collection';
import {getDBUsers, getDBTopics} from '../../core/db';
import {getMatchedUserName} from '../../core/user';
import {appActions} from '../../core/app';
import TopicList from '../../components/TopicList';
import Loading from '../../components/Loading';

export class CollectionPage extends Component {

  componentWillMount() {
    const {loadCollections, matchedName, collections, toggleAppNav} = this.props;

    if (!collections) {
      loadCollections({
        loginname: matchedName
      });
    }

    toggleAppNav(true);
  }

  render() {
    const {collections} = this.props;

    if (collections) {
      return (
        <TopicList data={collections}/>
      );
    } else {
      return (
        <Loading/>
      )
    }
  }
}

const mapStateToProps = createSelector(
  getDBTopics,
  getDBUsers,
  getMatchedUserName,
  (dbTopics, dbUsers, matchedName) => {
    const matchedUser = dbUsers.get(matchedName);
    let collections = false;

    if (matchedUser) {
      collections = matchedUser.get('collections');

      if (collections) {
        collections = collections.map((collectionId) => {
          const collection = dbTopics.get(collectionId);

          return collection.set('author', dbUsers.get(collection.get('author')));
        });
      }
    }

    return {
      matchedName,
      collections
    }
  }
);

const mapDispatchToProps = {
  loadCollections: collectionActions.loadCollections,
  toggleAppNav: appActions.toggleAppNav
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionPage);