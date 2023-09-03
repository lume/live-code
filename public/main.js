// import './global-vue.js'
import Vue from 'vue'
import {TestFeatures} from '@lume/live-code'

Vue.config.productionTip = false

// TODO test live-code here

new Vue({
	render: h => h(TestFeatures),
}).$mount('#app')
