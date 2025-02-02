import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>{" "}
  </React.StrictMode>
);
