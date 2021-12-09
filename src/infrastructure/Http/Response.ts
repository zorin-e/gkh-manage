import { CommonResponse } from "../Api/types";

export class Response<D> {
  payload: Readonly<{ data: D | null; message: string | null }>;
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
      message,
    };
    this.status = status;
    this.success = success;
  }
}
