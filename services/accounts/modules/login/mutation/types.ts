export type ChangePasswordInputTypes = {
  oldPassword: string;
  newPassword: string;
};
export type requestPasswordResetInputTypes = {
  email: string;
};
export type ResetPassInputTypes = {
  resetPasswordToken: string;
  newPassword: string;
};
