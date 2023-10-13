import { createRouter, createWebHistory } from "vue-router";
import Game from "../components/Game.vue";
import Unlimited from "../components/unlimited/Unlimited.vue";
import Login from "../components/Login.vue";
const routes = [
  {
    path: "/",
    name: "Game",
    component: Game,
  },
  {
    path: "/unlim",
    name: "Unlimited",
    component: Unlimited,
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

export default router;
