import Vue from 'vue'
import Test from './Test.vue'

Vue.config.productionTip = false

// TODO test code-vue here

new Vue({
  render: h => h(Test),
}).$mount('#app')
