import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import SoramitsuElements from '@soramitsu/soramitsu-js-ui'
import '@soramitsu/soramitsu-js-ui/lib/styles/index.ts'
Vue.use(SoramitsuElements)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
