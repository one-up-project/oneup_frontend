import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Configurar Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // URL de tu backend GraphQL
  cache: new InMemoryCache(),
});

// Crear el root de React
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderizar la aplicación envuelta en ApolloProvider
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);