import React, {Component, PropTypes} from "react";

import NavLink from './NavLink';

import './index.css';

export default class AppNav extends Component {

  constructor() {
    super(...arguments);
    this.handleToggleAppNav = this.handleToggleAppNav.bind(this);
  }

  handleToggleAppNav() {
    const {toggleAppNav, appNavIsShow} = this.props;
    toggleAppNav(!appNavIsShow);
  }

  render() {
    const {props, handleToggleAppNav} = this;
    const {appNavIsShow} = props;

    return (
      <div>
        {appNavIsShow && <div className="page_cover" onClick={handleToggleAppNav}></div>}
        <div className={`app_nav_wrap ${appNavIsShow ? '' : 'hide'}`}>
          <nav className="app_nav">
            <NavLink to="/user" name="用户" onClick={handleToggleAppNav}/>
            <NavLink to="/topics/all" name="全部" onClick={handleToggleAppNav}/>
            <NavLink to="/topics/good" name="精华" onClick={handleToggleAppNav}/>
            <NavLink to="/topics/share" name="分享" onClick={handleToggleAppNav}/>
            <NavLink to="/topics/ask" name="问答" onClick={handleToggleAppNav}/>
            <NavLink to="/topics/job" name="招聘" onClick={handleToggleAppNav}/>
          </nav>
        </div>
      </div>
    );
  }
}

AppNav.propTypes = {
  appNavIsShow: PropTypes.bool.isRequired,
  toggleAppNav: PropTypes.func.isRequired
};