// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import common from './common'
import addressPicker from 'vue-address-picker'

// import VueDND from 'awe-dnd'

// Vue.use(VueDND)


import axios from 'axios'
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.prototype.$bus= new Vue()
Vue.use(Element);
Vue.use(common);
Vue.use(addressPicker);
// router.beforeEach((to, from, next) => {
//
//   // do something
//   next();
// });
// var nowUrl = "";
// router.afterEach((to, from, next) => {
//   var url=window.location;
//   this.getUrlFlag = url.hash
// });

//run env first
import env from './env.js' //just run
console.log('import env ok');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
