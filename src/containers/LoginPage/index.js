import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {authActions} from '../../core/auth';

import './index.css';

export class LoginPage extends Component {

  constructor() {
    super(...arguments);
    this.login = this.login.bind(this);
  }

  login() {
    const {login} = this.props;

    login({
      accesstoken: this.input.value
    })
  }

  render() {
    const {props, login} = this;
    const {auth, location: {state}} = props;

    const {from} = state || {from: {pathname: '/'}};
    const accesstoken = auth.get('accesstoken');

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
    auth: state.auth
  };
};

const mapDispatchToProps = {
  login: authActions.login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
