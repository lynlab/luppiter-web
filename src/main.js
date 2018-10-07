import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';

import App from './App.vue';
import router from './router';

import SelectBox from './components/SelectBox.vue';
import ToggleSwitch from './components/ToggleSwitch.vue';
import PermissionHandler from './components/PermissionHandler.vue';

Vue.config.productionTip = false;
Vue.use(VueLocalStorage);

Vue.component('SelectBox', SelectBox);
Vue.component('ToggleSwitch', ToggleSwitch);
Vue.component('PermissionHandler', PermissionHandler);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
