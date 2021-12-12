import { Module } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { OrdersState } from "./types";

const state: OrdersState = {
  orders: {
    data: [],
    pagination: {
      page: 0,
      pages: 0,
      perpage: 0,
      total: 0,
    },
  },
};

const namespaced = true;

export const orders: Module<OrdersState, null> = {
  namespaced,
  state,
  mutations,
  actions,
  // getters,
};
