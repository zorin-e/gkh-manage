import { AnyObject } from "@/domain/AnyObject.type";

export type Request = {
  url: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  data?: AnyObject;
  config?: AnyObject;
};
