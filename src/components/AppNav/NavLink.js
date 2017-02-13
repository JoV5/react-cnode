import React, {PropTypes} from "react";
import {Link} from "react-router-dom";

import './index.css';

const NavLink = ({to, name, onClick}) =>
  <Link to={to} className="app_nav_item" onClick={onClick}>{name}</Link>;

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default NavLink;