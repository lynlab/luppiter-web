import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Reference from './views/Reference.vue';

import APIKeyService from './views/services/APIKey.vue';
import KeyValueService from './views/services/KeyValue.vue';
import StorageService from './views/services/Storage.vue';
import StorageUploadService from './views/services/StorageUpload.vue';

import ErrorUnauthorized from './views/errors/Unauthorized.vue';

import CallbackAuth from './callbacks/Auth.vue';

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

    // Services
    {
      path: '/services/api_key',
      name: 'service-apikey',
      component: APIKeyService,
    },
    {
      path: '/services/storage',
      name: 'service-storage',
      component: StorageService,
    },
    {
      path: '/services/storage/upload',
      name: 'service-storage-upload',
      component: StorageUploadService,
    },
    {
      path: '/services/key_value',
      name: 'service-keyvalue',
      component: KeyValueService,
    },

    // Errors
    {
      path: '/errors/401',
      name: 'error-unauthorized',
      component: ErrorUnauthorized,
    },

    // Callbacks
    {
      path: '/callbacks/auth',
      name: 'callbacks-auth',
      component: CallbackAuth,
    },
  ],
});
