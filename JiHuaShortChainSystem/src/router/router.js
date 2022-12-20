import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterMap from './RouterMap'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: RouterMap,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const address = to.path
  if (address.match(/^\/ControlPanel\//)) {
    if (token) {
      next()
    } else {
      next('Login')
    }
  } else {
    next()
  }
})

export default router
