import {Element, element} from '@lume/element'
import html from 'solid-js/html'
import './LiveCode.js'
import {stripIndent} from './stripIndent.js'

export
@element('test-features')
class TestFeatures extends Element {
	scriptIframe = stripIndent(/*js*/ `
		document.head.innerHTML = \`
			<style>
				body {
					background: pink;
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
	`).trim()

	htmlIframe = stripIndent(/*html*/ `
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
		</script>
	`).trim()

	template = () => html`
		<div>
			<h2>This example runs JavaScript code inside an iframe, in a script tag in the body.</h2>

			<live-code content=${this.scriptIframe} mode="script>iframe"></live-code>

			<h2>This example runs HTML code inside an iframe.</h2>

			<live-code content=${this.htmlIframe} mode="html>iframe"></live-code>

			<h2>Hide the editor, show only the preview.</h2>

			<live-code editor-hidden content=${this.htmlIframe} mode="html>iframe"></live-code>
		</div>
	`
}
