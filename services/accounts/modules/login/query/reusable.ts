import jwt from "jsonwebtoken";
import { JWTKey } from "../../../config";

// Databases
import User from "../../../model/accounts";

// TypesValidation
import { AccessTokenTypes } from "./types";

export const GenerateAccessToken = async ({ email }: AccessTokenTypes) => {
  const Find_User = await User.findOne({ email });
  if (Find_User) {
    return await jwt.sign({ id: Find_User._id }, JWTKey, {
      expiresIn: "3d",
    });
  } else {
    return "";
  }
};
