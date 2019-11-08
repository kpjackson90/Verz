import React, { Component } from "react";
import Header from "./partials/Header";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Landing from "./Landing";
import Home from "./Home";
import Discover from "./Discover";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/landing" component={Landing}></Route>
          <Route exact path="/discover" component={Discover}></Route>
        </Switch>
      </div>
    );
  }
}
export default App;
