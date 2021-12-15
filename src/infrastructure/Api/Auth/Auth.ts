import { Http, Response } from "@/infrastructure/Http";
import { SignInRequest, SignInResponse } from "./types";
export class Auth {
  constructor(private http: Http) {}

  async signIn(data: SignInRequest): Promise<Response<SignInResponse>> {
    return new Response(
      await this.http.request({
        url: "/oauth/token",
        method: "post",
        data: {
          grant_type: "password",
          client_secret: "FeAo1dklNqDtA8HMj7ishBZxaGiVfJS5t7ykpJTk",
          client_id: 2,
          ...data,
        },
      })
    );
  }
}
