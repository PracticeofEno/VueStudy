import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import AuthView from "../views/AuthView.vue";
import SignUp from "../views/SignUp.vue"
import Info from "../views/Info.vue"
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LoginView,
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    {
      path: "/info",
      name: "info",
      component: Info,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

/*
router.beforeEach(async (to, from) => {
  let isAuthenticated = false;
  if (to.name !== 'auth')
  {
    if (useUserStore().login == false && to.name != "home")
      return ( { name : 'home'})
  }
})
*/
export default router;
