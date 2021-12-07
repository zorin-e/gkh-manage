import { Http, Response } from "@/infrastructure/http";
import { SignInRequest, SignInResponse } from "./types";
export class Auth {
  constructor(private http: Http) {}

  async signIn(data: SignInRequest): Promise<Response<SignInResponse>> {
    return this.http.request<SignInResponse>({
      url: "/auth/login",
      method: "post",
      data,
    });
  }
}
