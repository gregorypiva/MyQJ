import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import {router} from './router';
import {store} from './store';
import {config} from './myqj.config';

Vue.config.productionTip = config.mode === 'production' ? false : true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
