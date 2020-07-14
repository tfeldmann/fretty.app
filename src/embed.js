import Vue from "vue";
import Embed from "./embed/Embed.vue";

Vue.config.productionTip = false;

new Vue({
    render: h => h(Embed)
}).$mount("#app");
