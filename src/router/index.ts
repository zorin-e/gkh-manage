import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Dashboard from "@/presentation/views/Dashboard.vue";
import LayoutDefault from "@/presentation/layouts/LayoutDefault.vue";
import LayoutLogin from "@/presentation/layouts/LayoutLogin.vue";
import SignIn from "@/presentation/views/SignIn.vue";
import { ROUTES } from "@/domain/routes";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/sign-in",
    name: ROUTES.signIn.name,
    component: SignIn,
    meta: {
      layout: LayoutLogin,
    },
  },
  {
    path: "/",
    name: ROUTES.dashboard.name,
    component: Dashboard,
    meta: {
      layout: LayoutDefault,
    },
  },
  {
    path: "/houses",
    name: ROUTES.houses.name,
    component: () => import("@/presentation/views/Houses.vue"),
    meta: {
      layout: LayoutDefault,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
