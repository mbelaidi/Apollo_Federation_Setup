import jwt from "jsonwebtoken";

// Databases
import User from "../../../model/accounts";

// TypesValidation
import { AccessTokenTypes } from "./types";

export const GenerateAccessToken = async ({ email, key }: AccessTokenTypes) => {
  const Find_User = await User.findOne({ email });
  if (Find_User) {
    return await jwt.sign({ id: Find_User._id }, "secretKey", {
      expiresIn: "3d",
    });
  } else {
    return "";
  }
};
