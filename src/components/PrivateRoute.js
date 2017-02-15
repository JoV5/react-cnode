import React, {PropTypes} from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component, hasLogin, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      hasLogin ?
        React.createElement(component, props) :
        <Redirect
          to={{
            pathname: '/login',
            state: {from: props.location}
          }}
        />
    )}/>
  )
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  hasLogin: PropTypes.bool.isRequired
};

export default PrivateRoute;