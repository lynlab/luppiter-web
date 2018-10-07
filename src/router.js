import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/auth/Login.vue';
import Logout from './views/auth/Logout.vue';
import Register from './views/auth/Register.vue';
import Reference from './views/Reference.vue';

import APIKeyService from './views/services/APIKey.vue';
import KeyValueService from './views/services/KeyValue.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/reference',
      name: 'reference',
      component: Reference,
    },

    // Auth
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },

    // Services
    {
      path: '/services/api_key',
      name: 'service-apikey',
      component: APIKeyService,
    },
    {
      path: '/services/key_value',
      name: 'service-keyvalue',
      component: KeyValueService,
    },
  ],
});
