import { employeesService } from "@/bootstrap";
import { ActionTree } from "vuex";
import { EmployeesState } from "./types";

export const actions: ActionTree<EmployeesState, null> = {
  async getAll({ commit }, params?: string) {
    const response = await employeesService.getAll(params);
    const { payload } = response;
    if (payload.data) commit("setEmployees", payload.data);
    return response;
  },
};
