import bcrypt from "bcryptjs";

// Apollo Server
import { IResolvers } from "apollo-server-express";

// Load Database
import User from "../../../model/accounts";

// Database Function
import { ChangePassword } from "../../../model/database";

// Function Validation
import { validateChangePassInput } from "./validation";

export const resolvers: IResolvers = {
  Mutation: {
    // Todo : Complete Func
    requestPasswordReset: async (_, { email }, { user }) => {},
    // Todo : Complete Func
    resetPassword: async (
      _,
      { email, resetPasswordToken, newPassword },
      { user }
    ) => {},
    // Todo : Complete Func
    changePassword: async (_, { oldPassword, newPassword }, { user }) => {
      const Find_user = await User.findOne({ _id: user.id });
      if (!Find_user) {
        throw new Error("Invalid Token");
      } else {
        const { isInvalid } = await validateChangePassInput({
          oldPassword,
          newPassword,
        });
        if (isInvalid) {
          const Match = await bcrypt.compare(oldPassword, Find_user.password);
          if (Match) {
            const HashedPass = await bcrypt.hash(newPassword, 12);
            const { updateUser, Valid } = await ChangePassword({
              user: Find_user,
              password: HashedPass,
            });
            if (Valid) return updateUser;
          }
        }
      }
    },
  },
};
