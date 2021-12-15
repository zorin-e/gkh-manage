import { MutationTree } from "vuex";
import { EmployeesState } from "./types";

export const mutations: MutationTree<EmployeesState> = {
  setEmployees(state, employees) {
    state.employees = employees;
  },
};
