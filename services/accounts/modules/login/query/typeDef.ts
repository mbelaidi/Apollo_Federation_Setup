const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  extend type Query {
    login(email: String!, password: String!): LoginResult!
  }
`;
