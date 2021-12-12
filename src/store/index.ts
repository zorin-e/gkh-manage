import Vue from "vue";
import Vuex from "vuex";
import { companies } from "./modules/companies";
import { houses } from "./modules/houses";
import { orders } from "./modules/orders";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    companies,
    houses,
    orders,
  },
});
