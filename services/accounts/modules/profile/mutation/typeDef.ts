const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  extend type Mutation {
    UpdateUserInfo(
      id: ID!
      firstName: String!
      lastName: String!
      address: String
      city: String
      country: String
      phone: String!
    ): ProfileResult! @auth
  }
`;
