import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/styles/common.scss";
import Notifications from "vue-notification";
import { refreshTokenFn } from "./bootstrap";

Vue.use(Notifications);
Vue.config.productionTip = false;

(async () => {
  await refreshTokenFn();
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
})();
