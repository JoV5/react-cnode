import React, {Component} from 'react';
import {connect} from 'react-redux';

import {authActions} from '../../core/auth';
import {appActions} from '../../core/app';

import './index.css';

export class SettingPage extends Component {

  constructor() {
    super(...arguments);
    this.login = this.login.bind(this);
  }

  /**
   * 在装载前进行数据加载
   */
  componentWillMount() {
    const {toggleAppNav} = this.props;
    
    toggleAppNav(false);
  }

  login() {
    const {history} = this.props;

    history.replace('/login', {
      from: `/setting`
    });
  }

  render() {
    const {props, login} = this;
    const {auth, logout, history: {goBack}} = props;

    const accesstoken = auth.get('accesstoken');

    return (
      <div className="setting_page">
        <div className="setting_page_header">
          <i className="iconfont float_left" onClick={goBack}>&#xe6e6;</i>
        </div>
        {
          accesstoken ?
            <button className="setting_page_logout" onClick={logout}>退出</button> :
            <button className="setting_page_logout" onClick={login}>登录</button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  logout: authActions.logout,
  toggleAppNav: appActions.toggleAppNav
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingPage);
