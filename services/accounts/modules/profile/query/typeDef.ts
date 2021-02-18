const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  extend type Query {
    currentUser: User! @auth
  }
`;
