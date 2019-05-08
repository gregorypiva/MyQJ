import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Recover from './views/LoginRecover.vue';
import New from './views/New.vue';
import Account from './views/Account.vue';
import Ticket from './views/Ticket.vue';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        menuBottom: true,
      },
    },
    {
      path: '/new',
      name: 'new',
      component: New,
      meta: {
        menuBottom: true,
      },
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        menuBottom: true,
      },
    },
    {
      path: '/ticket/:code',
      name: 'ticket',
      component: Ticket,
      meta: {
        menuBottom: true,
      },
    },
    { path: '/login', name: 'login', component: Login, meta: { publicPages: true, background: 'mid' } },
    { path: '/register', name: 'register', component: Register, meta: { publicPages: true, background: 'mid' } },
    { path: '/recover', name: 'recover', component: Recover, meta: { publicPages: true, background: 'mid' } },
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
