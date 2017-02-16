import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userActions} from '../../core/user';

export class UserPage extends Component {

  componentWillMount() {
    const {props} = this;
    const {loadUser, stateData, match: {params: {loginname: matchedName}}} = props;

    const finded = stateData.find((data) => {
      return data.loginname === matchedName;
    });

    if (!finded) {
      loadUser({
        loginname: matchedName
      });
    }
  }

  render() {
    const {props} = this;
    const {stateData, match: {params: {loginname: matchedName}}} = props;
    const finded = stateData.find((data) => {
      return data.loginname === matchedName;
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
    stateData: state.user.get('list')
  };
};

const mapDispatchToProps = {
  loadUser: userActions.loadUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
