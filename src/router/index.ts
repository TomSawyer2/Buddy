import { getToken } from "@/utils/storage";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: getToken().length > 0 ? "/personalInformation" : "/login",
    meta: { requiresAuth: true }, // 添加表示需要验证
    children: [
      {
        path: "/personalInformation",
        name: "personalInformation",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/personalInformation.vue"
          ),
      },
      {
        path: "/buddySquare",
        name: "buddySquare",
        component: () => import("../views/buddySquare.vue"),
      },
      {
        path: "/messageCenter",
        name: "messageCenter",
        component: () => import("../views/messageCenter.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: '*',
    component: () => import('@/views/Error404.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
