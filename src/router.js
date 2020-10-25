import firebase from "firebase";
import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Settings from "./components/Settings";
import TestComponents from "./components/TestComponents.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/dashboard",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/test",
      name: "Test",
      component: TestComponents,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
