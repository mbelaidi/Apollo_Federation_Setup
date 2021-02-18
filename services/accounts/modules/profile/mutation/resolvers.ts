// Apollo Server
import { IResolvers } from "apollo-server-express";

// Load Database
import User from "../../../model/accounts";

// Database Function
import { UpdateUserInfo } from "../../../model/database";

// Function Validation
import { validateUpdateUserInfoInput } from "./validation";

export const resolvers: IResolvers = {
  Mutation: {
    UpdateUserInfo: async (
      _,
      { firstName, lastName, address, city, country, phone },
      { user }
    ) => {
      const Find_User = await User.findOne({
        _id: user._id,
      });
      if (Find_User) {
        const { errors, isInvalid } = await validateUpdateUserInfoInput({
          firstName,
          lastName,
          phone,
          city,
          country,
        });
        if (isInvalid) {
          return { isInvalid, errors };
        } else {
          const { updateUser, valid } = await UpdateUserInfo({
            user: Find_User,
            firstName,
            lastName,
            address,
            city,
            country,
            phone,
          });
          if (valid) {
            return updateUser;
          }
        }
      } else {
        throw new Error("User Not Found");
      }
    },
  },
};
