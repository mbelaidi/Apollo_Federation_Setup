import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image: { filename: string; mimetype: string; encoding: string };
  phone: string;
  address: string;
  city: string;
  country: string;
  secretToken: string;
  isActive: boolean;
  createdAt: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  firstName: String,
  lastName: String,
  image: { filename: String, mimetype: String, encoding: String },
  phone: { type: String, required: true },
  address: { type: String, lowercase: true, trim: true },
  city: { type: String, lowercase: true, trim: true, required: true },
  country: { type: String, lowercase: true, trim: true },
  secretToken: String,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
