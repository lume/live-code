import Vue from 'vue'
import VueEditor from './VueEditor'

const Components = {
    VueEditor
}

for (const name of Object.keys(Components)) {
    Vue.component(name, Components[name])
}

export {VueEditor}