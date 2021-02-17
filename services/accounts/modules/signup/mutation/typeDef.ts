const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  extend type Mutation {
    signup(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
      address: String
      city: String
      country: String
      phone: String!
    ): RegisterResult!
  }
`;
