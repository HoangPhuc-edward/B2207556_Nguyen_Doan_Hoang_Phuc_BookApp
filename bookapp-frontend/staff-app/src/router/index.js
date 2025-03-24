import { createWebHistory, createRouter } from "vue-router";
import BookManagePage from "@/views/BookManagePage.vue";
import BookFormPage from "@/views/BookFormPage.vue";
import PublisherManagePage from "@/views/PublisherManagePage.vue";
import PublisherFormPage from "@/views/PublisherFormPage.vue";
import HomePage from "@/views/HomePage.vue";
import LogIn from "@/views/auth/LogIn.vue";
import AddAccount from "@/views/auth/AddAccount.vue";
const routes = [
  {
    path: "/",
    name: "welcome",
    component: () => import("@/views/Welcome.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
  },
  {
    path: "/borrow/form/:id",
    name: "borrow.form",
    component: () => import("@/views/BorrowFormPage.vue"),
  },
  {
    path: "/borrow",
    name: "borrow",
    component: () => import("@/views/BorrowManagePage.vue"),
  },
  {
    path: "/addaccount",
    name: "add.account",
    component: AddAccount,
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
  },
  {
    path: "/publisher",
    name: "publisher",
    component: PublisherManagePage,
  },
  {
    path: "/publisher/form/:id",
    name: "publisher.form",
    component: PublisherFormPage,
  },
  {
    path: "/book",
    name: "book",
    component: BookManagePage,
  },
  {
    path: "/book/form/:id",
    name: "book.form",
    component: BookFormPage,
    props: true,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
