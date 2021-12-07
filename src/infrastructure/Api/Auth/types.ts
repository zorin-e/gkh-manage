import { ErrorResponse } from "../types";

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  message?: string;
};
