const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  extend type Mutation {
    requestPasswordReset(email: String!): PasswordResult!
    resetPassword(
      resetPasswordToken: String!
      newPassword: String!
    ): PasswordResult!
    changePassword(oldPassword: String!, newPassword: String!): PasswordResult!
      @auth
  }
`;
