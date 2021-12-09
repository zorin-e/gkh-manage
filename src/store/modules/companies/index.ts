import { Module } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { CompaniesState } from "./types";

const state: CompaniesState = {
  companies: {
    data: [],
    pagination: {
      page: 0,
      pages: 0,
      perpage: 0,
      total: 0,
    },
  },
  shortCompanies: [],
  selectedCompanyId: null,
};

const namespaced = true;

export const companies: Module<CompaniesState, null> = {
  namespaced,
  state,
  mutations,
  actions,
  // getters,
};
