import { AnyObject } from "@/domain/AnyObject.type";
import { Connection } from "./Connection.interface";
import { Request } from "./Request.type";
import { ServerResponse } from "./ServerResponse.type";
export class Http {
  constructor(private client: Connection) {}

  setHeaders(headers: AnyObject) {
    this.client.setHeaders(headers);
  }

  deleteHeader(header: string) {
    this.client.deleteHeader(header);
  }

  request({
    url,
    method = "get",
    data,
    config,
  }: Request): Promise<ServerResponse> {
    if (url.startsWith("/")) {
      url = `${process.env.VUE_APP_API_ADDRESS}${url}`;
    }

    return this.client.request({
      url,
      method,
      data,
      config,
    });
  }
}
