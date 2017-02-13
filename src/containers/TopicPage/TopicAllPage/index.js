import React, {Component} from 'react';
import {connect} from 'react-redux';

import {apiActions} from '../../../core/api';

export class TopicAllPage extends Component {

  componentWillMount() {
    const {data, isPending, loadTopic} = this.props;

    if (!data && !isPending) {
      loadTopic({
        tab: 'all'
      });
    }
  }

  render() {

    return (
      <div>
        <h1>TopicAllPage</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.topicReducer
  };
};

const mapDispatchToProps = {
  loadTopic: apiActions.loadTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicAllPage);