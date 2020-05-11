import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import CreateCalendar from "../views/CreateCalendar.vue";
import SelectYear from "../components/CreateCalendar/SelectYear.vue";
import InsertEvents from "../components/CreateCalendar/InsertEvents.vue";
import SelectColors from "../components/CreateCalendar/SelectColors.vue";
import ShowCalendar from "../views/ShowCalendar.vue";

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
    redirect: "/create-calendar/select-year",
    children: [
      {
        path: "select-year",
        component: SelectYear
      }, 
      {
        path: "insert-events",
        component: InsertEvents
      },
      {
        path: "select-colors",
        component: SelectColors
      }
    ]
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
  routes
});

export default router;
