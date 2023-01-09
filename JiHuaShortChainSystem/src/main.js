import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/mainstyle.css'
import App from './App.vue'
import router from '@/router/router'
import store from '@/Store'
// 引入 echarts
import * as echarts from 'echarts'
import CryptoJS from 'crypto-js'

/* Module */
import QRCodeGeneration from '@/components/Module/QRCodeGeneration.vue'

Vue.prototype.$crypto = CryptoJS
Vue.prototype.$echarts = echarts
Vue.component('QRCodeGeneration', QRCodeGeneration)
Vue.use(ElementUI)
Vue.config.productionTip = false

export const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
