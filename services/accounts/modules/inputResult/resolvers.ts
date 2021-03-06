import { IResolvers } from "apollo-server-express";

export const resolvers: IResolvers = {
  RegisterResult: {
    __resolveType(obj: { _id: string; isInvalid: boolean }) {
      if (obj._id) {
        return "User";
      } else if (obj.isInvalid) {
        return "RegisterError";
      }
      return null;
    },
  },
  LoginResult: {
    __resolveType(obj: { token: string; isInvalid: boolean }) {
      if (obj.token) {
        return "AccessToken";
      } else if (obj.isInvalid) {
        return "LoginError";
      }
      return null;
    },
  },
  PasswordResult: {
    __resolveType(obj: { _id: string; isValid: boolean }) {
      if (obj._id) {
        return "User";
      } else if (!obj.isValid) {
        return "PasswordError";
      }
    },
  },
  ProfileResult: {
    __resolveType(obj: { _id: string; isInvalid: boolean }) {
      if (obj._id) {
        return "User";
      } else if (obj.isInvalid) {
        return "ProfileError";
      }
      return null;
    },
  },
};
