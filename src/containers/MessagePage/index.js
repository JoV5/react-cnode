import React, {Component} from "react";
import {connect} from 'react-redux';

import {messageActions} from '../../core/message';

export class MessagePage extends Component {

  componentWillMount() {
  }

  render() {
    return (
      <div>
        <h1>MessagePage</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
    userMe: state.user.get('me')
  };
};

const mapDispatchToProps = {
  loadMessages: messageActions.loadMessages,
  markAllMessage: messageActions.markAllMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePage);