import validator from "validator";

// isEmpty Function
export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// TypesValidation
import {
  ChangePasswordInputTypes,
  requestPasswordResetInputTypes,
  ResetPassInputTypes,
} from "./types";

export const validateChangePassInput = ({
  oldPassword,
  newPassword,
}: ChangePasswordInputTypes) => {
  let errors = {} as ChangePasswordInputTypes;
  oldPassword = !isEmpty(oldPassword) ? oldPassword : "";
  newPassword = !isEmpty(newPassword) ? newPassword : "";
  if (!validator.isLength(oldPassword, { min: 6, max: 30 })) {
    errors.oldPassword = "Old Password must be at least 6 characters";
  }
  if (validator.isEmpty(oldPassword)) {
    errors.oldPassword = "Old Password field is required";
  }
  if (!validator.isLength(newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "New Password must be at least 6 characters";
  }
  if (validator.isEmpty(newPassword)) {
    errors.newPassword = "New Password field is required";
  }
  if (oldPassword === newPassword) {
    errors.newPassword = "New password should be different";
  }
  return { errors, isValid: isEmpty(errors) };
};

export const validaterequestPasswordResetInput = ({
  email,
}: requestPasswordResetInputTypes) => {
  let errors = {} as requestPasswordResetInputTypes;
  if (!validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(email)) {
    errors.email = "Email field is required";
  }
  return { errors, isValid: isEmpty(errors) };
};

export const validateResetPassInput = ({
  resetPasswordToken,
  newPassword,
}: ResetPassInputTypes) => {
  let errors = {} as ResetPassInputTypes;
  newPassword = !isEmpty(newPassword) ? newPassword : "";
  resetPasswordToken = !isEmpty(resetPasswordToken) ? resetPasswordToken : "";
  if (validator.isEmpty(resetPasswordToken)) {
    errors.newPassword = "resetPasswordToken field is required";
  }
  if (!validator.isLength(newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "New Password must be at least 6 characters";
  }
  if (validator.isEmpty(newPassword)) {
    errors.newPassword = "New Password field is required";
  }
  return { errors, isValid: isEmpty(errors) };
};
