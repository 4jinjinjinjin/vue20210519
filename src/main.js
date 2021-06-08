import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import utils from '@/utils/utils.js'

Vue.config.productionTip = false
Vue.prototype.$baseUrl='http://localhost:8181'
Vue.prototype.utils=utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
