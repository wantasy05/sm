import Vue from "vue";
import "./cube-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import bus from "./bus";

// //swiper轮播
// import VueAwesomeSwiper from "vue-awesome-swiper";
// // require styles
// import "swiper/dist/css/swiper.css";

// Vue.use(VueAwesomeSwiper);

//vant组件
import Vant from "vant";
import "vant/lib/index.css";
import "./assets/css/index.css";

Vue.use(Vant);

import global_config from "./apis/global.js";
Vue.prototype.$bus = bus;
Vue.prototype.$global = global_config;

//是否为线上环境
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
