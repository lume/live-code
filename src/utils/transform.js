/**
 * Evaluate a script with the given scope.
 */
export default function evalJSWithScope(script, scope = {}) {
	let scopeDecl = ''
	for (let variable in scope) {
			// eslint-disable-next-line no-prototype-builtins
		if (scope.hasOwnProperty(variable)) {
			scopeDecl += 'var ' + variable + " = __scope__['" + variable + "'];"
		}
	}

	let code = `${scopeDecl};${script}`

	const result = new Function('__scope__', code)(scope) || {}
	return result
}
