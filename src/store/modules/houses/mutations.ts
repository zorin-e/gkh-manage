import { MutationTree } from "vuex";
import { HousesState } from "./types";

export const mutations: MutationTree<HousesState> = {
  setHouses(state, houses) {
    state.houses = houses;
  },
};
