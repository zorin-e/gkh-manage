import { Request } from "./Request.type";
import { ServerResponse } from "./ServerResponse.type";

export interface Connection {
  request(params: Request): Promise<ServerResponse>;
}
