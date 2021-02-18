import validator from "validator";

// isEmpty Function
export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// TypesValidation
import { UserInputTypes } from "./types";

export const validateUpdateUserInfoInput = ({
  firstName,
  lastName,
  phone,
  city,
  country,
}: UserInputTypes) => {
  let errors = {} as UserInputTypes;
  if (validator.isEmpty(firstName)) {
    errors.firstName = "firstName field is required";
  }
  if (validator.isEmpty(lastName)) {
    errors.lastName = "lastName field is required";
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
