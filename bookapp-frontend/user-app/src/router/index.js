import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: () => import("../views/Welcome.vue"),
  },
  {
    path: "/borrow",
    name: "borrow",
    component: () => import("../views/BorrowPage.vue"),
  },
  {
    path: "/info",
    name: "info",
    component: () => import("../views/UserInfo.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/LogIn.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/bookInfo/:id",
    name: "bookInfo",
    component: () => import("../views/BookInfoPage.vue"),
    props: true,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
