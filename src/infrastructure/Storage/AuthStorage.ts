import { Http } from "@/infrastructure/http";
import { TokenType } from "../Token";
import { TokenConnect } from "../Token/TokenConnect.interface";

export class AuthStorage {
  constructor(private http: Http, private token: TokenConnect) {}

  set(token: TokenType) {
    this.token.set(token);
    this.http.setHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  get() {
    return this.token.get();
  }

  delete() {
    this.token.delete();
    this.http.deleteHeader("Authorization");
  }
}
