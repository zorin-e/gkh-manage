import { MutationTree } from "vuex";
import { OrdersState } from "./types";

export const mutations: MutationTree<OrdersState> = {
  setOrders(state, orders) {
    state.orders = orders;
  },
};
