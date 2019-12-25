import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bmob from "hydrogen-js-sdk"
import axios from 'axios'

// 初始化 SDK版本 2.0.0 以下保留之前的初始化方法
//Bmob.initialize("23cf2d4d36e280027dc7d6c7a3b42b74", "6b22e0051e7529170fec1d2973b2b15b");
Bmob.initialize("6888ec971a00d421", "253188")
// 挂载到全局使用
Vue.prototype.Bmob = Bmob

Vue.prototype.axios = axios

// 全局过滤器 图片宽高
Vue.filter('setWH',(url, arg)=>{
	return url.replace(/w\.h/, arg);
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
