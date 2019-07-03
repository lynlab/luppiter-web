import Vue from 'vue';
import Router from 'vue-router';

import Auth from './views/Auth.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
  ],
});
