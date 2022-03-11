import { ApolloServer } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { connect } from "mongoose";
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import config from "config";
import path from "path";
import cors from "cors";
import express from "express";
import { resolvers } from "./graphql/resolvers";
import { PubSub } from "graphql-subscriptions";

(async function startApolloServer() {
  const app = express();
  const httpServer = createServer(app);

  const port = process.env.PORT || 5000;

  const uri = config.get("mdb") as string;

  const pubsub = new PubSub();

  const typeDefs = importSchema(
    path.join(__dirname, `./graphql/type-defs.graphql`)
  );

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  app.use(cors());

  const websocketServer = createServer((request, response) => {
    response.writeHead(404);
    response.end();
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: websocketServer, path: "/graphql" }
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }: any) => ({ req, res, pubsub }),
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await connect(uri);

  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  httpServer.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}/graphql`)
  );
})();
