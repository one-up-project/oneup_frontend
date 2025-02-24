import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const URL_GATEWAY = process.env.REACT_APP_URL_GATEWAY;
// Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: URL_GATEWAY,
  }),
  cache: new InMemoryCache(),
});

export default client;
