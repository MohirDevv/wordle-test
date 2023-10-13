import store from "../store/index";
import { createRouter, createWebHistory } from "vue-router";
import Game from "../components/Game.vue";
import Unlimited from "../components/unlimited/Unlimited.vue";
import Login from "../components/Login.vue";
import auth from "./middleware/auth";
const routes = [
  {
    path: "/",
    name: "Game",
    component: Game,
    meta: {
      // middleware: [auth],
    },
  },
  {
    path: "/unlim",
    name: "Unlimited",
    component: Unlimited,
    meta: {
      // middleware: [auth],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({ ...context });
});

export default router;
