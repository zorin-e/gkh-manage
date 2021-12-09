import { AnyObject } from "@/domain/AnyObject.type";
import { Request } from "./Request.type";
import { ServerResponse } from "./ServerResponse.type";

export interface Connection {
  request(params: Request): Promise<ServerResponse>;
  setHeaders(headers: AnyObject): void;
  deleteHeader(header: string): void;
}
