import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {authActions} from '../../core/auth';
import {appActions} from '../../core/app';

import './index.css';

export class LoginPage extends Component {

  constructor() {
    super(...arguments);
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    const {toggleAppNav} = this.props;
    
    toggleAppNav(false);
  }

  login() {
    const {login} = this.props;

    login({
      accesstoken: this.input.value
    })
  }

  render() {
    const {props, login} = this;
    const {auth, location: {state}, history: {goBack}} = props;

    const {from} = state || {from: {pathname: '/'}};
    const accesstoken = auth.get('accesstoken');

    if (accesstoken) {
      return (
        <Redirect to={from}/>
      )
    } else {
      return (
        <div className="login_page">
          <div className="login_page_header">
            <i className="iconfont float_left" onClick={goBack}>&#xe6e6;</i>
          </div>
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
  login: authActions.login,
  toggleAppNav: appActions.toggleAppNav
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
