import { GetAllOrdersResponse } from "@/infrastructure/Api/Orders/types";

export type OrdersState = {
  orders: GetAllOrdersResponse;
};
