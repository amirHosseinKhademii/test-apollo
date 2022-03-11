import { ApolloClient, InMemoryCache } from "@apollo/client";
import { token } from "./token";
import { setContext } from "@apollo/client/link/context";
import "cross-fetch/polyfill";

import { BatchHttpLink } from "@apollo/client/link/batch-http";

const httpLink = new BatchHttpLink({
  uri: "http://localhost:5002",
  batchMax: 5,
  batchInterval: 20,
});

// const httpLink = createHttpLink({
//   uri: 'http://localhost:5001',
// })

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
