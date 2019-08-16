import 'codemirror/addon/mode/overlay'
import 'codemirror/addon/mode/simple'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/jsx/jsx'

import Vue from 'vue'
import VueEditor from './VueEditor'

const Components = {
    VueEditor
}

for (const name of Object.keys(Components)) {
    Vue.component(name, Components[name])
}

export {VueEditor}