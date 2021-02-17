// Express
import express from "express";
// Apollo
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";
import AppSource from "./gatewaySource";
// MongoDb Library and Key
import connect from "./connect";
const db = require("./config").mongoURI;

const gateway = new ApolloGateway({
  serviceList: [{ name: "accounts", url: "http://localhost:4001/graphql" }],
  buildService({ name, url }) {
    return new AppSource({ url });
  },
});

// Gateway Server
const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => ({ req, res: req.res }),
});

// Express Middleware
const app = express();
server.applyMiddleware({ app, cors: false });

// Start Server
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Gateway ready at http://localhost:4000${server.graphqlPath}`)
);
// Setup Database and Start Server
connect({ db });
