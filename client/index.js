import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { Router, Route } from "react-router-dom";
import history from "./history";
import requireAuth from "./components/auth/requireAuth";
import "./styles/style.css";

import App from "./components/App";
import Discover from "./components/Discover";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";

const httpLink = createHttpLink({
  uri: "/graphql",
  opts: {
    credentials: "same-origin"
  }
});

const authMiddleware = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache()
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <Route path="/" component={App}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/discover" component={Discover}></Route>
        <Route path="/landing" component={Landing}></Route>
        <Route path="/dashboard" component={requireAuth(Dashboard)}></Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
