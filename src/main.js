import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueLocalstorage from 'vue-localstorage';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [
  'ion-icon',
];

Vue.use(VueLocalstorage);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
