import { MutationTree } from "vuex";
import { SpecialistsState } from "./types";

export const mutations: MutationTree<SpecialistsState> = {
  setSpecialists(state, specialists) {
    state.specialists = specialists;
  },
};
