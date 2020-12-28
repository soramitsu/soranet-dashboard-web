import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'

import { TOKENS } from '@/consts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:token',
    name: 'App',
    component: App,
    beforeEnter: (to, from, next) => {
      const { token } = to.params
      if (token !== TOKENS.XOR && token !== TOKENS.VAL) {
        return next(`/${TOKENS.VAL}`)
      }
      next()
    }
  },
  {
    path: '*',
    redirect: `/${TOKENS.VAL}`
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
