import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "booking",
    component: () => import(/* webpackChunkName: "Booking" */ "../views/Booking.vue")
  },
  {
    path: "/tour",
    name: "tour",
    component: () => import(/* webpackChunkName: "Tour" */ "../views/Tour.vue")
  },
  {
    path: "/course",
    name: "course",
    component: () =>
      import(/* webpackChunkName: "Course" */ "../views/Course.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
