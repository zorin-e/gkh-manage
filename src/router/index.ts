import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/presentation/views/Home.vue";
import LayoutDefault from "@/presentation/layouts/LayoutDefault.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: LayoutDefault,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/presentation/views/About.vue"),
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
