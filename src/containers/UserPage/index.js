import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userActions} from '../../core/user';

export class UserPage extends Component {

  componentWillMount() {
    const {loadUser, stateData} = this.props;

    if (!stateData.size) {
      loadUser({
        loginname: 'JoV5'
      });
    }
  }

  render() {
    const {stateData} = this.props;

    const finded = stateData.find((data) => {
      return data.loginname === 'JoV5';
    });

    if (finded) {
      const {loginname, avatar_url, create_at, score} = finded;
      return (
        <div>
          {loginname}<br/>
          {avatar_url}<br/>
          {create_at}<br/>
          {score}<br/>
        </div>
      );
    } else {
      return (
        <div>
          加载中...
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    stateData: state.user.get('data')
  };
};

const mapDispatchToProps = {
  loadUser: userActions.loadUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
