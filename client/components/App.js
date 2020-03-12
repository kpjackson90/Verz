import React, { Component } from "react";
import Header from "./partials/Header";
import { Switch, Route, Redirect } from "react-router-dom";
import "../styles/App.css"

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./Home";
import Discover from "./Discover";


const App = () => {
  return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route  path="/login" component={Login}></Route>
          <Route  path="/signup" component={Signup}></Route>
          <Route  path="/discover" component={Discover}></Route>
        </Switch>
      </div>
  )
}

export default App;
