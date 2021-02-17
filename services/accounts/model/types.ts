import { IUser } from "./accounts";

export type CreateUserTypes = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  address: string;
  city: string;
  country: string;
  phone: string;
};
export type UpdateUserTypes = {
  user: IUser;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
};
export type ChangepassTypes = {
  user: IUser;
  password: any;
};
