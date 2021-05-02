<template>
	<div>
		<h2>
			This example runs vanilla JavaScript in the current browsing context (careful, it can pollute the current
			context!)
		</h2>

		<live-code :template="script" mode="script"></live-code>

		<h2>
			This example runs vanilla JavaScript inside an iframe, in a script tag in the body. (safe, it won't pollute
			the current context)
		</h2>

		<live-code :template="scriptIframe" mode="script>iframe"></live-code>

		<h2>
			This example runs HTML code inside an iframe. (safe, it won't pollute the current context)
		</h2>

		<live-code :template="htmlIframe" mode="html>iframe"></live-code>

		<h2>
			This one runs a Vue component right inside the same DOM context.
		</h2>

		<live-code :template="code" mode="vue"></live-code>

		<h2>This one outputs Vue DOM into an iframe.</h2>

		<live-code :template="code2" mode="vue>iframe"></live-code>
	</div>
</template>

<script>
	import stripIndent from 'strip-indent'
	import LiveCode from './LiveCode'

	export default {
		components: {LiveCode},

		data: () => ({
			/* eslint-disable no-useless-escape */
			htmlIframe: stripIndent(`
				<style>
					body {
						background: skyblue;
						width: 100%;
						height: 100%;
					}
				</style>

				<script>
					let count = 0

					setInterval(() => {
						document.body.insertAdjacentHTML(
							'beforeend',
							'<br />inside iframe: ' + count++
						)
					}, 1000)
				<\/script>
			`).trim(),

			script: stripIndent(`
				window.buttonClick = () => {
					document.body.insertAdjacentHTML(
						'afterbegin',
						'<p>Polluted!</p>'
					)
				}

				// click the button to see that this example pollutes the environment...
				document.body.insertAdjacentHTML(
					'afterbegin',
					'<button onclick="buttonClick()">Click to pollute...</button>'
				)
			`).trim(),

			scriptIframe: stripIndent(`
				document.head.innerHTML = \`
					<style>
						body {
							background: skyblue;
							width: 100%;
							height: 100%;
						}
					</style>
				\`

				let count = 0

				setInterval(() => {
					document.body.insertAdjacentHTML(
						'beforeend',
						'<br />inside iframe: ' + count++
					)
				}, 1000)
			`).trim(),

			code: stripIndent(`
				<template>
					<h1>Count: {{count}}</h1>
				</template>

				<style>
					h1 {
						background: deeppink;
					}
				</style>

				<script>
					export default {
						data: () => ({
							count: 0,
						}),
						mounted() {
							setInterval(() => {
								this.count++
							}, 200);
						},
					}
				<\/script>
			`).trim(),

			code2: stripIndent(`
				<template>
					<h1>Count: {{count}}</h1>
				</template>

				<style>
					/* style the body inside the iframe */
					body {
						margin: 0;
						padding: 0;
						width: 100%;
						height: 100%;
					}
					h1 {
						background: deeppink;
					}
				</style>

				<script>
					export default {
						data: () => ({
							count: 0,
						}),
						mounted() {
							setInterval(() => {
								this.count++
							}, 200);
						},
					}
				<\/script>
			`).trim(),
		}),
	}
</script>
