import require from './require.js'
window.require = require

/**
 * Evaluate a script with the given scope. The code is wrapped with a basic
 * CommonJS wrapper, in case it exports anything.
 */
export default function evalJSWithScope(script, scope = {}, module = true) {
	// https://www.npmjs.com/package/babel-standalone

	let scopeDecl = ''
	for (let variable in scope) {
		if (scope.hasOwnProperty(variable)) {
			scopeDecl += 'var ' + variable + " = __scope__['" + variable + "'];"
		}
	}

	let code = `${scopeDecl};${script}`

	if (module) {
		code = `
            return (function() {
                let exports = {}
                let module = {};
                module.exports = exports;

                ${code};

                return module.exports.__esModule ? module.exports.default : module.exports;
            })()
        `
	}

	const result = new Function('__scope__', code)(scope) || {}
	return result
}
