import bcrypt from "bcryptjs";
import randomstring from "randomstring";

// Apollo Server
import { IResolvers } from "apollo-server-express";

// Load Database
import User from "../../../model/accounts";

// Database Function
import { ChangePassword, storeSecretToken } from "../../../model/database";

// Function Validation
import {
  validaterequestPasswordResetInput,
  validateChangePassInput,
  validateResetPassInput,
} from "./validation";

export const resolvers: IResolvers = {
  Mutation: {
    requestPasswordReset: async (_, { email }, { user }) => {
      const { errors, isValid } = validaterequestPasswordResetInput(email);
      if (isValid) {
        const Find_user = await User.findOne({ email });
        if (!Find_user) {
          return {
            isValid: false,
            errors: {
              email: "Email Not Found",
            },
          };
        } else {
          const secretToken = randomstring.generate();
          const { Valid } = await storeSecretToken({
            user: Find_user,
            token: secretToken,
          });
          if (Valid) {
            // Todo : Config Email Send Protocol
            // SendEmail({
            //   to: email,
            //   subject: "Reset Password",
            //   html: secretToken,
            // });
            return Find_user;
          }
        }
      } else {
        return { isValid, errors };
      }
    },
    resetPassword: async (_, { resetPasswordToken, newPassword }, { user }) => {
      const { errors, isValid } = validateResetPassInput({
        resetPasswordToken,
        newPassword,
      });
      if (isValid) {
        const Find_user = await User.findOne({
          "secretToken.resetPasswordToken": resetPasswordToken,
        });
        if (!Find_user) {
          throw new Error("Invalid SecretToken");
        } else {
          newPassword = await bcrypt.hash(newPassword, 12);
          const { updateUser, Valid } = await ChangePassword({
            user: Find_user,
            password: newPassword,
          });
          if (Valid) return updateUser;
        }
      } else {
        return {
          isValid,
          errors,
        };
      }
    },
    changePassword: async (_, { oldPassword, newPassword }, { user }) => {
      const Find_user = await User.findOne({ _id: user.id });
      if (!Find_user) {
        throw new Error("User Not Found");
      } else {
        const { errors, isValid } = await validateChangePassInput({
          oldPassword,
          newPassword,
        });
        if (isValid) {
          const Match = await bcrypt.compare(oldPassword, Find_user.password);
          if (Match) {
            const HashedPass = await bcrypt.hash(newPassword, 12);
            const { updateUser, Valid } = await ChangePassword({
              user: Find_user,
              password: HashedPass,
            });
            if (Valid) return updateUser;
          } else {
            return {
              isValid: false,
              errors: { oldPassword: "Wrong Password" },
            };
          }
        } else {
          return { isValid, errors };
        }
      }
    },
  },
};
