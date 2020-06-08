import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import App from "./App.vue";

Vue.use(Buefy, {
  defaultIconPack: "fas",
  defaultContainerElement: "#content",
});
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
