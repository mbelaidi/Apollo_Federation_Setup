const { gql } = require("apollo-server-express");

// language=GraphQL
export const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  type User @key(fields: "id") {
    id: ID!
    email: String
    firstName: String
    lastName: String
    phone: String
    address: String
    city: String
    country: String
    createdAt: String
  }
`;
