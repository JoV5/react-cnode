import React, {PropTypes} from 'react';
import {NavLink} from 'react-router-dom';

import {TAB_MAP} from '../../core/constants';

import './index.css';

const TopicsHeader = ({tab, toggleTopicsNav, topicsNavIsShow}) => (
  <header className="topics_header">
    <div onClick={() => toggleTopicsNav()}>{TAB_MAP[tab] + (topicsNavIsShow ? ' ∧' : ' ∨')}</div>
    {
      topicsNavIsShow &&
      <nav className="topics_header_nav" onClick={() => toggleTopicsNav()}>
        <NavLink to='/topics/all' className="topics_header_nav_item" activeClassName="active_item">全部</NavLink>
        <NavLink to='/topics/good' className="topics_header_nav_item" activeClassName="active_item">精华</NavLink>
        <NavLink to='/topics/share' className="topics_header_nav_item" activeClassName="active_item">分享</NavLink>
        <NavLink to='/topics/ask' className="topics_header_nav_item" activeClassName="active_item">问答</NavLink>
        <NavLink to='/topics/job' className="topics_header_nav_item" activeClassName="active_item">招聘</NavLink>
      </nav>
    }
  </header>
);

TopicsHeader.propTypes = {
  tab: PropTypes.string,
  toggleTopicsNav: PropTypes.func,
  topicsNavIsShow: PropTypes.bool
};

export default TopicsHeader;