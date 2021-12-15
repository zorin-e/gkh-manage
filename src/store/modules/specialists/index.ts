import { Module } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { SpecialistsState } from "./types";

const state: SpecialistsState = {
  specialists: {
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

export const specialists: Module<SpecialistsState, null> = {
  namespaced,
  state,
  mutations,
  actions,
  // getters,
};
