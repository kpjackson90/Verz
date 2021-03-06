import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { Router } from "react-router-dom";
import history from "./history";
import { resolvers, typeDefs } from "./resolvers";
import gql from "graphql-tag";
import requireAuth from "./components/auth/requireAuth";
import { AUTH_TOKEN } from "./constants";
import "./styles/style.css";

import App from "./components/App";
import Home from "./components/Home";
import Login from "./components/auth/Login";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("graphQLErrors", graphQLErrors);
  }
  if (networkError) {
    console.log("networkError", networkError);
  }
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
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

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authMiddleware.concat(link),
  cache,
  typeDefs,
  resolvers
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token")
  }
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <Home /> : <Login />;
};

const Root = () => {
  return (
    <Router history={history}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
