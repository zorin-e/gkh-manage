import axios, { AxiosRequestConfig } from "axios";
import { AnyObject } from "@/domain/AnyObject.type";
import { Connection } from "./Connection.interface";
import { Request } from "./Request.type";
import { Response } from "./Response.type";

export class Axios implements Connection {
  private initialHeaders: AnyObject;
  private config: AxiosRequestConfig;
  private allHeaders: AnyObject;

  constructor(config?: AxiosRequestConfig) {
    this.config = config || {};
    this.initialHeaders = this.config.headers || {};
    this.allHeaders = {
      ...this.initialHeaders,
    };
  }

  setHeaders(headers: AnyObject) {
    this.allHeaders = {
      ...this.allHeaders,
      ...headers,
    };
  }

  deleteHeader(header: string) {
    delete this.allHeaders[header];
  }

  async request<T>({
    url,
    method,
    data,
    config,
  }: Request): Promise<Response<T>> {
    const headers = config?.headers || {};
    const isHeaders = Object.keys(headers).length > 0;
    if (isHeaders) {
      this.allHeaders = {
        ...this.allHeaders,
        ...headers,
      };
    }

    try {
      const response = await axios
        .create({
          ...config,
          headers: this.allHeaders,
        })
        .request({
          url,
          method,
          data,
        });

      return {
        status: response.status,
        success: true,
        payload: response.data,
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
