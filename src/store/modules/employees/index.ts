import { Module } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { EmployeesState } from "./types";

const state: EmployeesState = {
  employees: {
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

export const employees: Module<EmployeesState, null> = {
  namespaced,
  state,
  mutations,
  actions,
  // getters,
};
