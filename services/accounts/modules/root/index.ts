const { resolvers } = require("./resolvers");
const { typeDefs } = require("./typeDef");

export const root = {
  resolvers,
  typeDefs,
};
