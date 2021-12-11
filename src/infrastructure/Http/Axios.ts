import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Connection } from "./Connection.interface";
import { Request } from "./Request.type";
import { ServerResponse } from "./ServerResponse.type";

export class Axios implements Connection {
  private readonly instance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }

  async request({
    url,
    method,
    data,
    config,
  }: Request): Promise<ServerResponse> {
    try {
      const response = await this.instance.request({
        url,
        method,
        data,
        ...config,
      });

      const payloadData = response.data.data
        ? response.data
        : { data: response.data };

      return {
        status: response.status,
        success: true,
        payload: payloadData,
      };
    } catch (error: any) {
      const message = error.toJSON().message;
      return {
        status: error.response?.status,
        success: false,
        payload: error.response?.data || {
          message: message === "Network Error" ? "Нет интернета" : message,
        },
      };
    }
  }
}
