const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  extend type Mutation {
    requestPasswordReset(email: String!): Boolean!
    resetPassword(
      email: String!
      resetPasswordToken: String!
      newPassword: String!
    ): Boolean!
    changePassword(oldPassword: String!, newPassword: String!): Boolean! @auth
  }
`;
