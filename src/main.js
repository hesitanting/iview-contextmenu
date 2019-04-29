import Vue from 'vue'
import iView from 'iview'
import App from './App.vue'

import 'iview/dist/styles/iview.css'

Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
