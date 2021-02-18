const { gql } = require("apollo-server-express");

export const typeDefs = gql`
  #  Register Erreur
  union RegisterResult = User | RegisterError
  type RegisterError {
    errors: UserInputError!
  }
  type UserInputError {
    email: String
    firstName: String
    lastName: String
    password: String
    address: String
    city: String
    country: String
    phone: String
  }
  #  Login Erreur
  union LoginResult = AccessToken | LoginError
  type AccessToken {
    token: String!
  }
  type LoginError {
    errors: LoginInputError!
  }
  type LoginInputError {
    email: String
    password: String
  }
  #  Password Erreur
  union PasswordResult = User | PasswordError
  type PasswordError {
    errors: PasswordInputError!
  }
  type PasswordInputError {
    email: String
    resetPasswordToken: String
    newPassword: String
    oldPassword: String
  }
  #  Update User Erreur
  union ProfileResult = User | ProfileError
  type ProfileError {
    errors: UserInputError!
  }
`;
