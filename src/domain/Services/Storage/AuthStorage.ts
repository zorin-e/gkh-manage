import { TokenType } from "@/infrastructure/Token";
import { TokenConnect } from "@/infrastructure/Token/TokenConnect.interface";

export class AuthStorage {
  constructor(private token: TokenConnect) {}

  set(token: TokenType) {
    this.token.set(token);
  }

  get() {
    return this.token.get();
  }

  delete() {
    this.token.delete();
  }
}
