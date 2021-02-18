// Express
import express from "express";
// Apollo
import { ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { mergeSchemas } from "graphql-tools";
import { ApolloServerPluginInlineTraceDisabled } from "apollo-server-core";

// MongoDb Library and Key
import connect from "./connect";
const db = require("./config").mongoURI;
// Services Modules
const { modules } = require("./modules");
// Apollo SchemaDirectives Functions
const schemaDirectives = require("./directives");

// Express Server
const app = express();
app.use(express.json());

// Murge Schema
const federatedSchema = buildFederatedSchema(modules);
const schema = mergeSchemas({
  schemas: [federatedSchema],
  schemaDirectives,
});

// Apollo Server
const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
  plugins: [ApolloServerPluginInlineTraceDisabled()],
});

// Apply Express Middleware
server.applyMiddleware({ app, cors: false });

// Start Server
app.listen({ port: 4001 }, () =>
  console.log(
    `🚀 Accounts Services ready at http://localhost:4001${server.graphqlPath}`
  )
);

// Setup Database and Start Server
connect({ db });
