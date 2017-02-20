import React, {PropTypes} from "react";
import {Link} from "react-router-dom";

import './index.css';

const NavLink = ({to, name, onClick, count}) =>
  <Link to={to} className="app_nav_item" onClick={onClick}>
    {name}
    {!!count && <span className="app_nav_item_count">{count}</span>}
  </Link>;

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default NavLink;