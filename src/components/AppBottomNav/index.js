import React, {Component, PropTypes} from "react";
import {NavLink} from 'react-router-dom';

import './index.css';

export default class AppBottomNav extends Component {

  render() {
    const {auth, show, selectedTab} = this.props;
    const loginname = auth.get('loginname');

    return (
      <nav className={`app_bottom_nav ${show ? 'show' : ''}`}>
        <NavLink to={`/topics/${selectedTab}`} className="iconfont app_bottom_nav_item" activeClassName="active_item">&#xe622;</NavLink>
        <NavLink to='/message' className="iconfont app_bottom_nav_item" activeClassName="active_item">&#xe634;</NavLink>
        <NavLink to={`/collection/${loginname}`} className="iconfont app_bottom_nav_item" activeClassName="active_item">&#xe619;</NavLink>
        {
          loginname ?
            <NavLink to={`/user/${loginname}`} className="iconfont app_bottom_nav_item" activeClassName="active_item">&#xe649;</NavLink> :
            <NavLink to="/login" className="app_bottom_nav_item iconfont" activeClassName="active_item">&#xe649;</NavLink>
        }
      </nav>
    );
  }
}

AppBottomNav.propTypes = {
  logout: PropTypes.func
};