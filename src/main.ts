import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

// Creamos un bus para eventos entre componentes no directos (hijo-padre)
export const EventBus = new Vue();

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
