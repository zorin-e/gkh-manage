import { Auth } from "@/infrastructure/Api/Auth";
import { SignInRequest, SignInResponse } from "@/infrastructure/Api/Auth/types";
import { Response } from "@/infrastructure/Http";
import { AuthStorage } from "@/domain/Services/Storage/AuthStorage";
import { errorCodes } from "@/domain/constants/errorCodes";

export class AuthService {
  constructor(private auth: Auth, private authStorage: AuthStorage) {}

  async signIn(data: SignInRequest): Promise<Response<SignInResponse>> {
    const response = await this.auth.signIn(data);
    const { payload, success, status } = response;

    if (!success) {
      return {
        status,
        success,
        payload: {
          ...payload,
          message:
            errorCodes.auth[status] ||
            errorCodes.common[status] ||
            payload.message,
        },
      };
    }
    if (payload.data?.access_token) {
      this.authStorage.set(payload.data.access_token);
    }
    return response;
  }

  isAuth() {
    return Boolean(this.authStorage.get());
  }
}
