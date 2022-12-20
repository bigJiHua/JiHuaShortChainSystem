import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/mainstyle.css'
import App from './App.vue'
import router from '@/router/router'

/* Module */
import QRCodeGeneration from '@/components/Module/QRCodeGeneration.vue'
Vue.component('QRCodeGeneration', QRCodeGeneration)

Vue.use(ElementUI)
Vue.config.productionTip = false

export const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
