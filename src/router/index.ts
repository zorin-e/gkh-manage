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
    redirect: { name: ROUTES.dashboard.name },
  },
  {
    path: "/dashboard",
    name: ROUTES.dashboard.name,
    component: Dashboard,
    meta: {
      layout: LayoutDefault,
    },
  },
  {
    path: "/houses",
    name: ROUTES.houses.name,
    component: () => import("@/presentation/views/Houses/List.vue"),
    meta: {
      title: ROUTES.houses.title,
      layout: LayoutDefault,
    },
    children: [
      {
        path: "add",
        name: ROUTES.addHouse.name,
        component: () => import("@/presentation/views/Houses/Modal.vue"),
        meta: {
          title: ROUTES.addHouse.title,
          layout: LayoutDefault,
          isModal: true,
        },
      },
      {
        path: ":id",
        name: ROUTES.editHouse.name,
        component: () => import("@/presentation/views/Houses/Modal.vue"),
        meta: {
          title: ROUTES.editHouse.title,
          layout: LayoutDefault,
          isModal: true,
        },
      },
    ],
  },
  {
    path: "/companies",
    name: ROUTES.companies.name,
    component: () => import("@/presentation/views/Companies/List.vue"),
    meta: {
      title: ROUTES.companies.title,
      layout: LayoutDefault,
    },
    children: [
      {
        path: "add",
        name: ROUTES.addCompany.name,
        component: () => import("@/presentation/views/Companies/Modal.vue"),
        meta: {
          title: ROUTES.addCompany.title,
          layout: LayoutDefault,
          isModal: true,
        },
      },
      {
        path: ":id",
        name: ROUTES.editCompany.name,
        component: () => import("@/presentation/views/Companies/Modal.vue"),
        meta: {
          title: ROUTES.editCompany.title,
          layout: LayoutDefault,
          isModal: true,
        },
      },
    ],
  },
  {
    path: "/employers",
    name: ROUTES.employers.name,
  },
  {
    path: "/services",
    name: ROUTES.services.name,
  },
  {
    path: "/issues",
    name: ROUTES.issues.name,
  },
  {
    path: "/calendar",
    name: ROUTES.calendar.name,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
