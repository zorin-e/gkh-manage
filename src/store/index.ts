import Vue from "vue";
import Vuex from "vuex";
import { companies } from "./modules/companies";
import { houses } from "./modules/houses";
import { orders } from "./modules/orders";
import { employees } from "./modules/employees";
import { specialists } from "./modules/specialists";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    companies,
    houses,
    orders,
    employees,
    specialists,
  },
});
