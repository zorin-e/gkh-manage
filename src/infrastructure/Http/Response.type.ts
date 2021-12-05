export interface Response<T> {
  status: number;
  payload: T;
  success: boolean;
}
