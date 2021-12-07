import { AnyObject } from "@/domain/AnyObject.type";
import { Request } from "./Request.type";
import { Response } from "./Response.type";

export interface Connection {
  request<T>(params: Request): Promise<Response<T>>;
  setHeaders(headers: AnyObject): void;
  deleteHeader(header: string): void;
}
