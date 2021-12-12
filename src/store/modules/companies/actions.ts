import { companiesService } from "@/bootstrap";
import { CompanyId } from "@/infrastructure/Api/Companies/types";
import { ActionTree } from "vuex";
import { CompaniesState } from "./types";

export const actions: ActionTree<CompaniesState, null> = {
  async getAll({ commit }, params?: string) {
    const response = await companiesService.getAll(params);
    const { payload } = response;
    if (payload.data) commit("setCompanies", payload.data);
    return response;
  },
  async getAllWithShortData({ commit }) {
    commit("setShortCompanies", await companiesService.getAllWithShortData());
  },
  setCompanyId({ commit }, id: CompanyId) {
    commit("setCompanyId", id);
  },
};
