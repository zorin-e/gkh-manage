import { Http, Response } from "@/infrastructure/Http";
import { SignInRequest, SignInResponse } from "./types";
export class Auth {
  constructor(private http: Http) {}

  async signIn(data: SignInRequest): Promise<Response<SignInResponse>> {
    return new Response(
      await this.http.request({
        url: "/auth/login",
        method: "post",
        data,
      })
    );
  }
}
