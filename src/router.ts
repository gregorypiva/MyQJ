import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Recover from './views/LoginRecover.vue';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    { path: '/login', component: Login, meta: { publicPages: true } },
    { path: '/register', component: Register, meta: { publicPages: true } },
    { path: '/recover', component: Recover, meta: { publicPages: true } },
    { path: '*', redirect: '/' },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const loggedIn = localStorage.getItem('user');
  if (to.matched.some((record) => !record.meta.publicPages) && !loggedIn) {
    return next('/login');
  }
  next();
});
