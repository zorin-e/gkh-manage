import { AuthService } from "@/domain/Services/Auth";
import { CompaniesService } from "@/domain/Services/Companies";
import { HousesService } from "@/domain/Services/Houses";
import { SignOutService } from "@/domain/Services/SignOut";
import { Auth } from "@/infrastructure/Api/Auth";
import { Companies } from "@/infrastructure/Api/Companies";
import { Houses } from "@/infrastructure/Api/Houses";
import { Http } from "@/infrastructure/Http";
import { Axios } from "@/infrastructure/Http";
import { AuthStorage } from "@/domain/Services/Storage/AuthStorage";
import { Token } from "@/infrastructure/Token";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import router from "@/router";
import { ROUTES } from "./domain/routes";
import { RefreshTokenService } from "./domain/Services/RefreshToken/RefreshTokenService";
import { RefreshToken } from "./infrastructure/Api/RefreshToken";
import { OrderService } from "./domain/Services/Orders";
import { Orders } from "./infrastructure/Api/Orders";
import { EmployeesService } from "./domain/Services/Employees";
import { Employees } from "./infrastructure/Api/Employees";
import { SpecialistsService } from "./domain/Services/Specialists";
import { Specialists } from "./infrastructure/Api/Specialists";
const authToken = new Token({ tokenName: "access_token" });
const axiosAdapter = new Axios();
const axiosInstance = axiosAdapter.getInstance();
const http = new Http(axiosAdapter);
const authStorage = new AuthStorage(authToken);
authStorage.set(authToken.get());
const authService = new AuthService(new Auth(http), authStorage);
const signOutService = new SignOutService(authStorage);
const companiesService = new CompaniesService(new Companies(http));
const housesService = new HousesService(new Houses(http));
const refreshTokenService = new RefreshTokenService(new RefreshToken(http));
const ordersService = new OrderService(new Orders(http));
const employeesService = new EmployeesService(new Employees(http));
const specialistsService = new SpecialistsService(new Specialists(http));

const refreshTokenFn = async () => {
  const { refreshToken } = await refreshTokenService.get();
  if (refreshToken) {
    authStorage.delete();
    authStorage.set(refreshToken);
    axiosInstance.defaults.headers.common["Authorization"] = refreshToken;
  }
};

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = authStorage.get();

    if (token) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: "Bearer " + token,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("auth/login")) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url.includes("auth/refresh")
    ) {
      router.push({ name: ROUTES.signIn.name });
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await refreshTokenFn();
    }

    return Promise.reject(error);
  }
);

export {
  authStorage,
  authToken,
  authService,
  signOutService,
  companiesService,
  housesService,
  refreshTokenService,
  ordersService,
  employeesService,
  specialistsService,
  refreshTokenFn,
};
