import Vue from 'vue'
import LiveCode from './LiveCode'

const Components = {
	LiveCode,
}

for (const name of Object.keys(Components)) {
	Vue.component(name, Components[name])
}

export {LiveCode}
