// Apollo Server
import { IResolvers } from "apollo-server-express";

export const resolvers: IResolvers = {
  Query: {
    currentUser: async (_, __, { user }) => {
      return user;
    },
  },
};
