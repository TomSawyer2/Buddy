import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

import Message from "./components/Message";
//引入这个是为了解决有时候图标展示不正常，可以先注释了尝试一下
// import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.prototype.$message = Message;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
