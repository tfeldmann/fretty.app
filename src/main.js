import Vue from "vue";
import App from "./App.vue";
import {
  ConfigProgrammatic,
  Autocomplete,
  Input,
  Field,
  Button,
  Dropdown,
  Numberinput,
  Radio
} from "buefy";

import { library } from "@fortawesome/fontawesome-svg-core";
// internal icons
import {
  faPlus,
  faMinus,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faPlus,
  faMinus,
  faTimesCircle
);
Vue.component("vue-fontawesome", FontAwesomeIcon);

import "./assets/scss/app.scss";

Vue.use(Autocomplete);
Vue.use(Input);
Vue.use(Field);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(Numberinput);
Vue.use(Radio);

// https://buefy.org/documentation/constructor-options
ConfigProgrammatic.setOptions({
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
  defaultContainerElement: "#content"
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
