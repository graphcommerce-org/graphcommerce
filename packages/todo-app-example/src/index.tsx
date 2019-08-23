import "todomvc-common";
import "todomvc-app-css/index.css";

import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { App } from "./App";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: "/graphql" })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
