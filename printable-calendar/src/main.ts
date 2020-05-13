import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "vuetify";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Vue.use(vuetify);

new Vue({
  router,
  store,
  vuetify: new Vuetify({}),
  render: h => h(App)
}).$mount("#app");
