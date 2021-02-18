import jwt from "jsonwebtoken";
import { JWTKey } from "../config";
// Apollo
import { AuthenticationError } from "apollo-server-express";

// Databases
import User from "../model/accounts";

// TypesValidation
import { AccessTokenTypes, AuthenticationTypes } from "./types";

export const checkAuthentication = async ({
  context: { req, res },
}: AuthenticationTypes) => {
  const token = req.headers?.authorization;
  if (token) {
    // @ts-ignore
    const { user, isValid, err } = await jwt.verify(
      token,
      JWTKey,
      async (err: any, decoded: any) => {
        if (decoded) {
          const Find_user_Db = await User.findOne({
            _id: decoded.id,
          });
          if (!Find_user_Db?.isActive) {
            return {
              isValid: false,
              user: Find_user_Db,
              err: "BLOCKED",
            };
          } else
            return {
              isValid: true,
              user: Find_user_Db,
              err: "",
            };
        } else if (err) {
          return { isValid: false, user: {}, err: err?.name };
        }
      }
    );
    if (isValid) {
      if (!err) {
        return { user };
      } else if (err === "BLOCKED") {
        throw new AuthenticationError("Blocked Account");
      } else {
        throw new AuthenticationError("AuthenticationError");
      }
    } else {
      throw new AuthenticationError("Authorization Header must be provided");
    }
  }
};
export const GenerateAccessToken = async ({ user, key }: AccessTokenTypes) => {
  if (user) {
    return await jwt.sign({ id: user._id }, JWTKey, {
      expiresIn: "3d",
    });
  } else {
    return "";
  }
};
