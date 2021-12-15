import { Http, Response } from "@/infrastructure/Http";
import { TokenType } from "@/infrastructure/Token";

export class RefreshToken {
  constructor(private http: Http) {}

  get(): Promise<Response<{ token: TokenType }>> {
    return this.http.request({
      method: "post",
      url: "/oauth/token",
    });
  }
}
