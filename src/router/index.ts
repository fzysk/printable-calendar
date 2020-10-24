import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import CreateCalendar from "../views/CreateCalendar.vue";
import ShowCalendar from "../views/ShowCalendar.vue";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/create-calendar",
    component: CreateCalendar,
  },
  {
    path: "/show-calendar",
    component: ShowCalendar
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  base: 'printable-calendar'
});

export default router;
