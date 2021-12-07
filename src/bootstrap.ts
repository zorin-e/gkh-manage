import { AuthService } from "./domain/Services/Auth/AuthService";
import { Auth } from "./infrastructure/Api/Auth";
import { Http } from "./infrastructure/Http";
import { Axios } from "./infrastructure/Http";
import { AuthStorage } from "./infrastructure/Storage/AuthStorage";
import { Token } from "./infrastructure/Token";

const authToken = new Token({ tokenName: "access_token" });
const http = new Http(new Axios());
const authStorage = new AuthStorage(http, authToken);
authStorage.set(authToken.get());
const authService = new AuthService(new Auth(http), authStorage);

export { authStorage, authToken, authService };
