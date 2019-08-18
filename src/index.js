import Vue from 'vue'
import CodeVue from './CodeVue'

const Components = {
    CodeVue
}

for (const name of Object.keys(Components)) {
    Vue.component(name, Components[name])
}

export {CodeVue}