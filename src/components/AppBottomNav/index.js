import React, {Component, PropTypes} from "react";
import {NavLink} from 'react-router-dom';

import './index.css';

export default class AppBottomNav extends Component {

  render() {
    const {auth} = this.props;
    const loginname = auth.get('loginname');

    return (
      <nav className="app_bottom_nav">
        <NavLink to='/topics' className="app_bottom_nav_item" activeClassName="active_item">主题</NavLink>
        <NavLink to='/message' className="app_bottom_nav_item" activeClassName="active_item">消息</NavLink>
        <NavLink to={`/collection/${loginname}`} className="app_bottom_nav_item" activeClassName="active_item">收藏</NavLink>
        <NavLink to={`/user/${loginname}`} className="app_bottom_nav_item" activeClassName="active_item">我</NavLink>
      </nav>
    );
  }
}

AppBottomNav.propTypes = {
  logout: PropTypes.func
};