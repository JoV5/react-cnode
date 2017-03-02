import React, {Component, PropTypes} from "react";
import {is} from 'immutable';

import TopicCard from '../TopicCard';

export default class TopicList extends Component {

  shouldComponentUpdate(nextProps) {
    return !is(nextProps.data, this.props.data);
  }

  render() {
    const {data} = this.props;

    return (
      <div>
        {data.map((topic, i) => <TopicCard data={topic} key={i}/>)}
      </div>
    );
  }
}

TopicList.propTypes = {
  data: PropTypes.object.isRequired
};
