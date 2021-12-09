import axios, { AxiosRequestConfig } from "axios";
import { AnyObject } from "@/domain/AnyObject.type";
import { Connection } from "./Connection.interface";
import { Request } from "./Request.type";
import { ServerResponse } from "./ServerResponse.type";

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

  async request({
    url,
    method,
    data,
    config,
  }: Request): Promise<ServerResponse> {
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
