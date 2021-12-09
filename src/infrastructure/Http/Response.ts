import { errorCodes } from "@/domain/constants/errorCodes";
import { CommonResponse } from "../Api/types";

export class Response<D> {
  payload: { data: Readonly<D | null>; message: string | null };
  readonly status: number;
  readonly success: boolean;

  constructor({
    payload,
    status,
    success,
  }: {
    payload: CommonResponse<D>;
    status: number;
    success: boolean;
  }) {
    const { data = null, message = null } = payload;
    this.payload = {
      data,
      message: errorCodes.common[status] || message,
    };
    this.status = status;
    this.success = success;
  }
}
