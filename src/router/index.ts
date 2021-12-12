import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Dashboard from "@/presentation/views/Dashboard.vue";
import LayoutDefault from "@/presentation/layouts/LayoutDefault.vue";
import LayoutLogin from "@/presentation/layouts/LayoutLogin.vue";
import SignIn from "@/presentation/views/SignIn.vue";
import { ROUTES } from "@/domain/routes";
import { authService, signOutService } from "@/bootstrap";

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
        path: "add/:companyId",
        name: ROUTES.addHouse.name,
        component: () => import("@/presentation/views/Houses/Add.vue"),
        meta: {
          title: ROUTES.addHouse.title,
          layout: LayoutDefault,
          isModal: true,
        },
      },
      {
        path: ":companyId/:id",
        name: ROUTES.editHouse.name,
        component: () => import("@/presentation/views/Houses/Edit.vue"),
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
        component: () => import("@/presentation/views/Companies/Add.vue"),
        meta: {
          title: ROUTES.addCompany.title,
          layout: LayoutDefault,
          isModal: true,
        },
      },
      {
        path: ":id",
        name: ROUTES.editCompany.name,
        component: () => import("@/presentation/views/Companies/Edit.vue"),
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
    path: "/orders",
    name: ROUTES.orders.name,
    component: () => import("@/presentation/views/Orders/List.vue"),
    meta: {
      title: ROUTES.orders.title,
      layout: LayoutDefault,
    },
    children: [
      {
        path: "add/:companyId",
        name: ROUTES.addOrder.name,
        component: () => import("@/presentation/views/Orders/Add.vue"),
        meta: {
          title: ROUTES.addOrder.title,
          layout: LayoutDefault,
          isModal: true,
        },
      },
      {
        path: ":companyId/:id",
        name: ROUTES.editOrder.name,
        component: () => import("@/presentation/views/Orders/Edit.vue"),
        meta: {
          title: ROUTES.editOrder.title,
          layout: LayoutDefault,
          isModal: true,
        },
      },
    ],
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

router.beforeEach((to, from, next) => {
  if (to.meta?.layout === LayoutLogin) {
    if (authService.isAuth()) {
      signOutService.logout();
    }
    next();
  } else if (!authService.isAuth()) {
    next({
      name: ROUTES.signIn.name,
      params: {
        nextUrl: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;
