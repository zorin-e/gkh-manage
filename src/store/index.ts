import Vue from "vue";
import Vuex from "vuex";
import { companies } from "./modules/companies";
import { houses } from "./modules/houses";
Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    companies,
    houses,
  },
});
