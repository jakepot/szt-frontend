import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import moment from "moment";

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] =
    "Bearer " + token;
}

Vue.filter("formatDate", function(value: any) {
  if (value) {
    return moment(String(value)).format("DD.MM.YYYY HH:mm");
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
