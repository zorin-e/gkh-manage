import { CompanyId } from "@/infrastructure/Api/Companies/types";
import { MutationTree } from "vuex";
import { CompaniesState } from "./types";

export const mutations: MutationTree<CompaniesState> = {
  setCompanies(state, companies) {
    state.companies = companies;
  },
  setShortCompanies(state, companies) {
    state.shortCompanies = companies;
  },
  setCompanyId(state, id: CompanyId) {
    state.selectedCompanyId = id;
  },
};
