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
import { ExistUserTypes, RegisterInputTypes } from "./types";

export const validateRegisterInput = ({
  email,
  firstName,
  lastName,
  password,
  phone,
  city,
  country,
}: RegisterInputTypes) => {
  let errors = {} as RegisterInputTypes;
  if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(email)) {
    errors.email = "Email field is required";
  }
  if (validator.isEmpty(firstName)) {
    errors.firstName = "firstName field is required";
  }
  if (validator.isEmpty(lastName)) {
    errors.lastName = "lastName field is required";
  }
  if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }
  if (!validator.isMobilePhone(phone)) {
    errors.phone = "phone is invalid";
  }
  if (validator.isEmpty(phone)) {
    errors.phone = "phone field is required";
  }
  if (validator.isEmpty(city)) {
    errors.city = "city field is required";
  }
  if (validator.isEmpty(country)) {
    errors.country = "country field is required";
  }
  return { errors, isInvalid: !isEmpty(errors) };
};

export const validateExistUser = async ({ email }: ExistUserTypes) => {
  let errors = {} as ExistUserTypes;
  const Find_User = await User.findOne({ email });
  if (Find_User) {
    errors.email = "Email address already exist";
  }
  return { errors, isInvalid: !isEmpty(errors) };
};
