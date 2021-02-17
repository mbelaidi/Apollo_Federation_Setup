import bcrypt from "bcryptjs";
// Apollo Server
import { IResolvers } from "apollo-server-express";

// Input Validation
import { validateRegisterInput, validateExistUser } from "./validation";

// Database Function
import { CreateUser } from "../../../model/database";

export const resolvers: IResolvers = {
  Mutation: {
    signup: async (
      _,
      { email, firstName, lastName, password, address, city, country, phone }
    ) => {
      const { errors, isInvalid } = await validateRegisterInput({
        email,
        firstName,
        lastName,
        password,
        phone,
        city,
        country,
      });
      if (isInvalid) {
        console.log(errors);
        return { isInvalid, errors };
      } else {
        const { errors, isInvalid } = await validateExistUser({ email });
        if (isInvalid) {
          return { isInvalid, errors };
        } else {
          password = await bcrypt.hash(password, 12);
          const { newAccount, valid: UserValid } = await CreateUser({
            email,
            firstName,
            lastName,
            password,
            address,
            city,
            country,
            phone,
          });
          if (UserValid) return newAccount;
        }
      }
    },
  },
};
