import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {userActions} from '../../core/user';

import './index.css';

export class LoginPage extends Component {

  constructor() {
    super(...arguments);
    this.login = this.login.bind(this);
  }

  login() {
    const {postLogin} = this.props;

    postLogin({
      accesstoken: this.input.value
    })
  }

  render() {
    const {props, login} = this;
    const {stateDate, location: {state}} = props;

    const {from} = state || {from: {pathname: '/'}};
    const accesstoken = stateDate.get('accesstoken');

    if (accesstoken) {
      return (
        <Redirect to={from}/>
      )
    } else {
      return (
        <div className="login_page">
          <input className="access_token_input" ref={(input) => this.input = input}/>
          <button className="access_token_ok" onClick={login}>登录</button>
        </div>
      );
    }
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
)(LoginPage);
