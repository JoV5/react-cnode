import React, {Component, PropTypes} from "react";
import {is} from 'immutable';

import ReplyCard from './ReplyCard';

export default class TopicList extends Component {

  shouldComponentUpdate(nextProps) {
    return !is(nextProps.data, this.props.data);
  }

  render() {
    const {data, replyUp, userId, replyTopic} = this.props;

    return (
      <div>
        {
          data.map((reply, i) =>
            <ReplyCard data={reply} key={i} i={i} replyUp={replyUp} userId={userId} replyTopic={replyTopic}/>)
        }
      </div>
    );
  }
}

TopicList.propTypes = {
  data: PropTypes.object.isRequired,
  replyUp: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};
