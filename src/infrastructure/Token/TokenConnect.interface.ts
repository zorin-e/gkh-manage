import { TokenType } from ".";

export interface TokenConnect {
  get(): TokenType;
  set(token: TokenType): void;
  delete(): void;
}
