import { specialistsService } from "@/bootstrap";
import { ActionTree } from "vuex";
import { SpecialistsState } from "./types";

export const actions: ActionTree<SpecialistsState, null> = {
  async getAll({ commit }, params?: string) {
    const response = await specialistsService.getAll(params);
    const { payload } = response;
    if (payload.data) commit("setSpecialists", payload.data);
    return response;
  },
};
