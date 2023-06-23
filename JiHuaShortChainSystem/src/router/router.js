import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterMap from './RouterMap'
import { Notification } from 'element-ui'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: RouterMap,
  mode: 'history' // history
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const address = to.path
  if (address.match(/^\/ControlPanel\//)) {
    if (token) {
      next()
    } else {
      next('Login')
      Notification.error({
        title: '错误',
        message: '请登录！'
      })
    }
  } else {
    next()
  }
})

export default router
