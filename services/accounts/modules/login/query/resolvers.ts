// Apollo Server
import { IResolvers } from "apollo-server-express";

// Input Validation
import { validateLoginInput, matchUserPassword } from "./validation";

// Reusable Function
import { GenerateAccessToken } from "./reusable";

export const resolvers: IResolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const { errors, isInvalid } = await validateLoginInput({
        email,
        password,
      });
      if (isInvalid) {
        return { isInvalid, errors };
      } else {
        const { errors, isInvalid } = await matchUserPassword({
          email,
          password,
        });
        if (isInvalid) {
          return { isInvalid, errors };
        } else {
          const token = await GenerateAccessToken({
            email,
          });
          return { token };
        }
      }
    },
  },
};
