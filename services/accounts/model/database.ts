// Load Database
import User from "./accounts";

// TypesValidation
import { ChangepassTypes, CreateUserTypes, UpdateUserTypes } from "./types";

export const CreateUser = async ({
  email,
  firstName,
  lastName,
  password,
  address,
  city,
  country,
  phone,
}: CreateUserTypes) => {
  const newUser = new User({
    email,
    firstName,
    lastName,
    password,
    address,
    city,
    country,
    phone,
    isActive: true,
  });
  const Save_user = await newUser.save();
  if (Save_user) return { newAccount: Save_user, valid: true };
  else return { valid: false };
};

export const ChangePassword = async ({ user, password }: ChangepassTypes) => {
  user.password = password;
  const Save_User = await user.save();
  if (Save_User) return { updateUser: Save_User, Valid: true };
  else return { Valid: false };
};
