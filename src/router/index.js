import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'

import { TOKENS } from '@/consts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/:token',
    name: 'App',
    component: App,
    props: (route) => ({
      token: route.params.token === TOKENS.XOR ? TOKENS.XOR : TOKENS.VAL
    })
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
