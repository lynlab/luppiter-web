import Vue from 'vue';
import VueLocalstorage from 'vue-localstorage';
import VueMoment from 'vue-moment';
import VueNotifiaction from 'vue-notification';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [
  'ion-icon',
];

Vue.use(VueLocalstorage);
Vue.use(VueMoment);
Vue.use(VueNotifiaction);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
