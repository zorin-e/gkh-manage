import { housesService } from "@/bootstrap";
import { CompanyId } from "@/infrastructure/Api/Companies/types";
import { ActionTree } from "vuex";
import { HousesState } from "./types";

export const actions: ActionTree<HousesState, null> = {
  async getAll({ commit }, companyId: CompanyId, params?: string) {
    const response = await housesService.getAll(companyId, params);
    const { payload } = response;
    if (payload.data) commit("setHouses", payload.data);
    return response;
  },
};
