import { RefreshToken } from "@/infrastructure/Api/RefreshToken";
import { TokenType } from "@/infrastructure/Token";

export class RefreshTokenService {
  constructor(private repository: RefreshToken) {}

  async get(): Promise<{ refreshToken: TokenType }> {
    const { success, payload } = await this.repository.get();
    return {
      refreshToken: success ? payload.data!.token : "",
    };
  }
}
