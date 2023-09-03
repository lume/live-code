import Vue from 'vue'
import LiveCode from './LiveCode'
import TestFeatures from './TestFeatures'

const Components = {
	LiveCode,
	TestFeatures,
}

for (const name of Object.keys(Components)) {
	Vue.component(name, Components[name])
}

export {LiveCode, TestFeatures}
