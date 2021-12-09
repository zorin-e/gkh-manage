import { AnyObject } from "@/domain/AnyObject.type";

export type ServerResponse = {
  status: number;
  payload: any;
  success: boolean;
};
