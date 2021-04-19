<template>
	<div class="live-code">
		<editor
			ref="editor"
			class="live-code-editor"
			:options="options"
			:mode="mode"
			@change="handleChange"
			:value="editorValue"
		>
		</editor>

		<div v-if="error" class="live-code-error">
			<pre>{{ error }}</pre>
		</div>

		<preview
			v-if="!error"
			:key="forceRender"
			class="live-code-preview"
			:value="exports"
			:styles="styles"
			:keep-data="keepData"
			:mode="mode"
			@error="handleError"
		></preview>

		<button class="live-code-rerun" @click="rerun">
			rerun
		</button>

		<button class="live-code-reset" @click="reset">
			reset
		</button>
	</div>
</template>

<style>
	.live-code {
		display: flex;
		font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
		position: relative;
		height: 400px;
		width: 100%;
	}

	.live-code-editor,
	.live-code-preview,
	.live-code-error {
		border-radius: 2px;
		height: inherit;
		overflow: auto;
		width: 50%;
	}

	.live-code-editor {
		line-height: 1.2em;
		margin-right: 10px;
	}

	.live-code-error {
		color: #f66;
		padding: 25px 35px;
	}

	.live-code-preview,
	.live-code-error {
		border: 1px solid #eee;
		box-sizing: border-box;
	}

	.live-code-preview iframe {
		display: block;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		border: none;
	}

	[class^='live-code-scoped-'] {
		height: inherit;
	}

	.live-code-rerun {
		position: absolute;
		right: 0;
	}

	.live-code-reset {
		position: absolute;
		right: 40;
	}

	@media (max-width: 600px) {
		.live-code {
			display: block;
			height: auto;
		}

		.live-code-editor,
		.live-code-preview,
		.live-code-error {
			margin: 0 0 15px 0;
			height: 400px;
			width: 100%;
		}
	}

	/* Scrollbars */

	.live-code ::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: #f5f5f5;
	}

	.live-code ::-webkit-scrollbar {
		width: 8px;
		height: 8px;
		background-color: #f5f5f5;
	}

	.live-code ::-webkit-scrollbar-thumb {
		border-radius: 8px;
		background-color: #bbb;
		transition: all 0.5s;
	}

	.live-code ::-webkit-scrollbar-thumb:hover {
		border-radius: 8px;
		background-color: #777;
	}
</style>

<script>
	import debounce from 'lodash/debounce'
	import unescape from 'lodash/unescape'
	import Editor from './Editor'
	import Preview from './Preview'
	import parseVueSFC from './utils/parser'
	import compiler from './utils/compiler'
	import evalJSWithScope from './utils/transform'

	export default {
		components: {
			Preview,
			Editor,
		},

		props: {
			template: String,
			options: {},
			keepData: Boolean,
			value: String,
			scope: Object,
			autorun: {type: Boolean, default: true},

			/**
			 * Specify the editor mode:
			 * - vue - Export a Vue component which gets rendered in the preview area.
			 * - vue>iframe - Same a "Vue", but rendered into an iframe
			 * - script
			 * - script>iframe
			 * - html>iframe
			 */
			mode: {type: String, default: 'vue'},

			// if autorun is true, then autorun is debounced by this amount after user
			// types into the code editor.
			debounce: {type: Number, default: 50},
		},

		data() {
			return {
				exports: '',
				styles: '',
				error: '',
				editorValue: '',
				initialValue: this.value,
				forceRender: 0,
			}
		},

		watch: {
			value: {
				immediate: true,
				handler(val) {
					this.editorValue = val
					val && this.executeCodeDebounced()
				},
			},
		},

		created() {
			this.executeCodeDebounced = debounce(this.executeCode, this.debounce)

			let content = this.template

			// Is template starts with . or #,
			if (/^[.#]/.test(this.template)) {
				// consider it a selector from which to get the code from.
				const html = document.querySelector(this.template)
				if (!html) throw Error(`${this.template} is not found`)

				content = unescape(html.innerHTML)
			}

			if (content) {
				this.initialValue = content
				this.editorValue = content
				this.executeCode()
				this.$emit('input', content)
			}
		},

		methods: {
			handleError(err) {
				// TODO For now we skip harmless ResizeObserver errors. Chrome has a
				// bug that causes this error to be emitted when it shouldn't. We
				// should remove this block once the bug is fixed. See
				// https://github.com/w3c/csswg-drafts/issues/5487
				if (err.message.includes('ResizeObserver loop limit exceeded')) {
					// eslint-disable-next-line
					console.warn(err)
					return
				}

				// eslint-disable-next-line
				// debugger;
				this.error = err.message + ' (see console)'
				console.error(err) // eslint-disable-line
			},

			handleChange(val) {
				this.editorValue = val
				this.autorun && this.executeCodeDebounced()
				this.$emit('input', val)
			},

			rerun() {
				this.executeCodeDebounced.cancel()
				this.executeCode()

				// force Vue to re-make the preview, in case no values for preview have changed
				this.forceRender++
			},

			reset() {
				this.handleChange(this.initialValue)

				// force Vue to re-make the preview, in case no values for preview have changed
				this.forceRender++
			},

			executeCode() {
				this.error = ''
				this.styles = ''

				switch (this.mode) {
					case 'vue':
					case 'vue>iframe': {
						const parsed = parseVueSFC(this.editorValue)

						if (parsed.error) {
							// eslint-disable-next-line
							// debugger;
							this.error = parsed.error.message + '(see console)'
							console.error(parsed.error) // eslint-disable-line
							return
						}

						if (!parsed.script && !parsed.template) {
							this.error = 'no data'
							console.error('no data') // eslint-disable-line
						}

						const compiled = compiler(parsed.script)

						if (compiled.error) {
							// eslint-disable-next-line
							// debugger;
							this.error = compiled.error.message + '(see console)'
							console.error(compiled.error) // eslint-disable-line
							return
						}

						let exports

						try {
							exports = evalJSWithScope(compiled.script, this.scope)
						} catch (e) {
							// eslint-disable-next-line
							// debugger;
							this.error = e.message + ' (see console)'
							console.error(e) // eslint-disable-line
							return
						}

						if (parsed.template) {
							exports.template = parsed.template
						}

						this.exports = exports

						if (parsed.styles) this.styles = parsed.styles.join(' ')

						break
					}

					case 'script': {
						try {
							evalJSWithScope(this.editorValue, this.scope, false)
							break
						} catch (e) {
							// eslint-disable-next-line
							// debugger;
							this.error = e.message + ' (see console)'
							console.error(e) // eslint-disable-line
							break
						}
					}

					case 'script>iframe': {
						this.exports = this.editorValue
						break
					}

					case 'html>iframe': {
						this.exports = this.editorValue
						break
					}
				}
			},
		},
	}
</script>
