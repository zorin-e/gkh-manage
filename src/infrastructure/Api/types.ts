export type CommonResponse<D> = {
  status: string;
  errors: Array<{ code: number }> | null;
  message: string;
  data: D | null;
};

export type CommonList<D> = {
  pagination: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
  };
  data: Array<D>;
};

// export type ServerPayload<D> = {
//   data?: D;
//   messages?: {
//     detail?: Array<ServerMessage>;
//   };
//   message?: string;
// };
