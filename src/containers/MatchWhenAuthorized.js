import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";

export default class MatchWhenAuthorized extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const {component: Component, isAuthenticated, ...otherProps} = this.props;

    return (
      <div>
        <Route {...otherProps} render={(props) => {
          return isAuthenticated ? <Component {...props} {...otherProps}/> : <Redirect to={{
              pathname: "/login",
              state: {from: props.location}
            }}/>
        }}/>
      </div>
    );
  }
}

MatchWhenAuthorized.propTypes = {};
