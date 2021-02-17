import bcrypt from "bcryptjs";
import validator from "validator";

// isEmpty Function
export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// Databases
import User from "../../../model/accounts";

// TypesValidation
import { LoginInputTypes } from "./types";

export const validateLoginInput = ({ email, password }: LoginInputTypes) => {
  let errors = {} as LoginInputTypes;
  if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(email)) {
    errors.email = "Email field is required";
  }
  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }
  return { errors, isInvalid: !isEmpty(errors) };
};

export const matchUserPassword = async ({
  email,
  password,
}: LoginInputTypes) => {
  let errors = {} as LoginInputTypes;
  const Find_User = await User.findOne({ email });
  if (!Find_User) {
    errors.email = "Email address doesnt exist";
    return { errors, isInvalid: !isEmpty(errors) };
  } else {
    const Match = await bcrypt.compare(password, Find_User.password);
    if (!Match) {
      errors.password = "Password incorrect";
      return { errors, isInvalid: !isEmpty(errors) };
    } else if (!Find_User.isActive) {
      errors.email = "Your Account is inactive";
      return { errors, isInvalid: !isEmpty(errors) };
    } else {
      return { errors, isInvalid: false };
    }
  }
};
