import { Module } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { HousesState } from "./types";

const state: HousesState = {
  houses: {
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

export const houses: Module<HousesState, null> = {
  namespaced,
  state,
  mutations,
  actions,
  // getters,
};
