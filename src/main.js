import Vue from "vue";
import App from "./App.vue";
import {
  Autocomplete,
  Input,
  Field,
  Button,
  Dropdown,
  Numberinput,
  Radio,
} from "buefy";

import "./assets/scss/app.scss";

Vue.use(Autocomplete);
Vue.use(Input);
Vue.use(Field);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(Numberinput);
Vue.use(Radio);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
