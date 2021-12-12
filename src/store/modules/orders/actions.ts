import { ordersService } from "@/bootstrap";
import { CompanyId } from "@/infrastructure/Api/Companies/types";
import { ActionTree } from "vuex";
import { OrdersState } from "./types";

export const actions: ActionTree<OrdersState, null> = {
  async getAll({ commit }, companyId: CompanyId, params?: string) {
    const response = await ordersService.getAllWithConcatenatedData(
      companyId,
      params
    );
    const { payload } = response;
    if (payload.data) commit("setOrders", payload.data);
    return response;
  },
};
