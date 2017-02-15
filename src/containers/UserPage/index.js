import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userActions} from '../../core/user';

export class UserPage extends Component {

  render() {
    return (
      <div>
        UserPage
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateDate: state.user
  };
};

const mapDispatchToProps = {
  postLogin: userActions.postLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
