import { AnyObject } from "@/domain/AnyObject.type";

export interface Response<T> {
  status: number;
  payload: T | AnyObject;
  success: boolean;
}
