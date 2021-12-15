export type SignInRequest = {
  username: string;
  password: string;
};

export type SignInResponse = {
  access_token: string;
  message?: string;
};
