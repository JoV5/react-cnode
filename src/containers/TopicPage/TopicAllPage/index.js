import React, {Component} from 'react';
import {connect} from 'react-redux';

import {topicActions} from '../../../core/topic';

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
    ...state.topicReducer.all
  };
};

const mapDispatchToProps = {
  loadTopic: topicActions.loadTopic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicAllPage);