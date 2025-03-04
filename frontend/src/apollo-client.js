import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    //uri: "http://localhost:4000/", 
    uri: "https://oneup-ag-500667615440.us-central1.run.app",
  }),
  cache: new InMemoryCache(),
});

export default client;
