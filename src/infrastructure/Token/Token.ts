export type TokenType = string;

export class Token {
  token: TokenType;
  private tokenName: string;
  constructor({ tokenName }: { tokenName: string }) {
    this.tokenName = tokenName;
    this.token = "";
  }

  get(): TokenType {
    if (!this.token) this.token = localStorage.getItem(this.tokenName) || "";
    return this.token;
  }

  set(token: TokenType): void {
    this.token = token;
    localStorage.setItem(this.tokenName, String(this.token));
  }

  delete(): void {
    if (this.token) {
      this.token = "";
      localStorage.removeItem(this.tokenName);
    }
  }
}
