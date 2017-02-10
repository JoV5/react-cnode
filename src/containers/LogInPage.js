import React, {Component} from "react";
import {Redirect} from "react-router-dom";

export default class LogInPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.login = this.login.bind(this);
  }

  login() {
    this.props.authenticate();
    this.setState({redirectToRefer: true});
  }

  render() {

    //const { authenticate, location } = this.props;
    const {redirectToRefer} = this.state;
    const {from} = this.props.location.state || '/';

    return (
      <div>
        {redirectToRefer ?
          <Redirect to={from || "/dashboard"}/>
          :
          <div>
            <h1>Log in </h1>
            <button onClick={this.login}>Sign in</button>
          </div>
        }
      </div>
    );
  }
}

LogInPage.propTypes = {};
