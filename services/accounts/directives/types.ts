import { Schema } from "mongoose";

export type AuthenticationTypes = {
  context: any;
};
export type AccessTokenTypes = {
  user: {
    _id: Schema.Types.ObjectId;
  };
  key: string;
};
