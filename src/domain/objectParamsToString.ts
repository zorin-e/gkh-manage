import { AnyObject } from "./AnyObject.type";

export const objectParamsToString = (
  params: Record<string, AnyObject> = {}
): string => {
  return Object.entries(params).reduce((accum, value) => {
    if (value[0]) {
      const values = Object.entries(value[1]);
      values.forEach((item) => {
        accum += (accum ? "&" : "") + `${value[0]}[${item[0]}]=${item[1]}`;
      });
    }
    return accum;
  }, "");
};
