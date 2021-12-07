export type ErrorResponse = {
  status: string;
  errors: Array<{ code: number }>;
  message: string;
};
