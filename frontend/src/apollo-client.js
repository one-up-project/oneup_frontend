import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Configurar Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/", // URL gateway
  }),
  cache: new InMemoryCache(),
});

export default client;
