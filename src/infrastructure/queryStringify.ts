import { AnyObject } from "@/domain/AnyObject.type";
import querystring from "querystring";

export function queryStringify(params: AnyObject) {
  return querystring.stringify(params);
}
