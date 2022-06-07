import Vue from "vue";
import "@/plugins/axios";
import "@/filters";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import i18n from "@/plugins/i18n";
import "@/assets/css/reset.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
