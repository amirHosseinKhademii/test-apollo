import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import "cross-fetch/polyfill";

import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new BatchHttpLink({
  uri: "https://feed-api-test.herokuapp.com/v1/graphql",
  batchMax: 30,
  batchInterval: 20,
});

const wsLink = new WebSocketLink({
  uri: `wss://feed-api-test.herokuapp.com/v1/graphql`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({}),
});
