import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import lazyme from 'lazy-load-react';

//import HomePage from "./HomePage";
import LogInPage from "../LogInPage";
//import DashboardPage from "./DashboardPage";
import MatchWhenAuthorized from "../MatchWhenAuthorized";
import AppHeader from './AppHeader';

import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.authenticate = this.authenticate.bind(this);
    this.signout = this.signout.bind(this);
  }

  authenticate() {
    this.setState({isAuthenticated: true});
  }

  signout() {
    this.setState({isAuthenticated: false});
  }

  render() {

    //const { } = this.props;

    const {isAuthenticated} = this.state;

    return (
      <div>
        <AppHeader/>
        <nav className="homepage_nav">
          <Link to="/">全部</Link>
          <Link to="/dashboard">精华</Link>
          <Link to="/dashboard">分享</Link>
          <Link to="/dashboard">问答</Link>
          <Link to="/dashboard">招聘</Link>
          {!isAuthenticated && <Link to="/login">Log in</Link>}
        </nav>
        <Route exact path="/" component={lazyme(() => System.import('./../HomePage/index'))}/>
        <Route path="/login" render={props => {
          return <LogInPage authenticate={this.authenticate} {...props}/>
        }}/>
        <MatchWhenAuthorized isAuthenticated={isAuthenticated} pattern="/dashboard"
                             component={lazyme(() => System.import('./../DashboardPage'))}/>
      </div>
    )
  }
}

App.propTypes = {};
