import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import client from "./apollo-client";
import { ApolloProvider } from '@apollo/client';

// Crear el root de React

const root = ReactDOM.createRoot(document.getElementById("root"));

// ApolloProvider
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
  </React.StrictMode>
);