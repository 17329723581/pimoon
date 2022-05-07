import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import BigNumber from 'bignumber.js'

import lottie from 'vue-lottie';

localStorage.clear()
Vue.component('lottie', lottie)

// 点击复制
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 多语言
import i18n from './i18n'


import vuetify from './plugins/vuetify'

import '@/font/index.css'

Vue.prototype.$BigNumber = BigNumber
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
