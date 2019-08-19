
/**
 * Compiles code with Babel, if Babel is present.
 */
export default function (script = 'module.exports={}') {
  try {
    if (typeof Babel !== 'undefined') {
      const plugins = []
  
      // Register jsx plugin
      if (window['babel-plugin-transform-vue-jsx']) {
        if (!Babel.availablePlugins['transform-vue-jsx']) { // eslint-disable-line
          Babel.registerPlugin('transform-vue-jsx', window['babel-plugin-transform-vue-jsx']) // eslint-disable-line
        }
        plugins.push('transform-vue-jsx')
      }
  
      // TODO allow passing a config for configuring the target (es2015, es2016, etc).
      script = Babel.transform(script, { // eslint-disable-line
        presets: [['es2015', { 'loose': true }], 'stage-2'],
        plugins,
        comments: false
      }).code
    }

    return { script }
  } catch (error) {
    return { error }
  }
}
