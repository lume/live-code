<template>
	<form :class="'live-code' + (smaller__ ? ' live-code-smaller' : '')">
		<input class="live-code-tab-input" type="radio" name="tab" :id="'live-code-tab-1-' + this.id__" checked />
		<input class="live-code-tab-input" type="radio" name="tab" :id="'live-code-tab-2-' + this.id__" />

		<label class="live-code-tab-label" :for="'live-code-tab-1-' + this.id__">
			<span>CODE</span>

			<div class="live-code-edit-area live-code-tab-content">
				<div class="live-code-buttons">
					<div class="live-code-reset"><button @click="reset">Reset</button></div>
					<!--<div class="live-code-rerun"><button @click="rerun">Rerun</button></div>
					-->
				</div>

				<editor
					ref="editor"
					:options="options"
					:mode="mode"
					@change="__handleChange"
					:value="editorValue"
				></editor>
			</div>
		</label>

		<label class="live-code-tab-label" :for="'live-code-tab-2-' + this.id__">
			<span>RESULT</span>

			<div class="live-code-preview-area live-code-tab-content">
				<div class="live-code-buttons">
					<!--<div class="live-code-reset"><button @click="reset">Reset</button></div>
					-->
					<div class="live-code-rerun"><button @click="rerun">Rerun</button></div>
				</div>

				<div v-if="error" class="live-code-error">
					<pre>{{ error }}</pre>
				</div>

				<preview
					v-if="!error"
					:key="forceRender"
					:value="exports"
					:styles="styles"
					:keep-data="keepData"
					:mode="mode"
					@error="__handleError"
				></preview>
			</div>
		</label>
	</form>
</template>

<style>
	.live-code {
		font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
		height: 420px;
		width: 100%;
		position: relative;
		display: flex;

		--tab-color: deeppink;
	}

	.live-code-tab-input {
		display: none;
	}

	.live-code-smaller .live-code-tab-label {
		display: inline;
		width: 50%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		vertical-align: middle;
		background: #fff;
	}

	.live-code-smaller .live-code-tab-input:nth-child(1):checked ~ label:nth-child(3),
	.live-code-smaller .live-code-tab-input:nth-child(2):checked ~ label:nth-child(4) {
		background: var(--tab-color);
		color: white;
	}

	.live-code-smaller .live-code-tab-label > span {
		vertical-align: middle;
	}

	.live-code-tab-content:not(.live-code-smaller *) {
		height: 100%;
	}

	.live-code-smaller .live-code-tab-content {
		top: 40px;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
	}

	.live-code-tab-label:not(.live-code-smaller *) {
		width: 50%;
	}

	.live-code-tab-label:not(.live-code-smaller *) > span {
		display: none;
	}

	.live-code-smaller .live-code-tab-input:nth-child(1):not(:checked) ~ label:nth-child(3) > .live-code-tab-content,
	.live-code-smaller .live-code-tab-input:nth-child(2):not(:checked) ~ label:nth-child(4) > .live-code-tab-content {
		display: none;
	}

	/* Button row {{{ */

	.live-code-edit-area:not(.live-code-smaller *) .live-code-rerun,
	.live-code-preview-area:not(.live-code-smaller *) .live-code-reset {
		display: none;
	}

	.live-code-buttons {
		flex-grow: 0;
		height: 40px;
	}

	.live-code-buttons > * {
		display: inline;
	}

	.live-code-smaller .live-code-buttons button {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 0;
		border: none;
		border-top: 2px solid var(--tab-color);
	}

	/* }}} */

	/* Main area with editor and preview {{{ */

	.live-code-edit-area {
		display: flex;
		flex-direction: column;
	}

	.live-code-edit-area:not(.live-code-smaller *) {
		padding-right: 10px;
	}

	.live-code-preview-area {
		display: flex;
		flex-direction: column;
	}

	.live-code-preview,
	.live-code-error {
		box-sizing: border-box;
	}

	.live-code-editor,
	.live-code-preview,
	.live-code-error {
		flex-grow: 1;
		height: 100%;
		overflow: auto;
		border-radius: 2px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		background: #f9f9f9;
	}

	.live-code-error {
		color: #f66;
		padding: 25px 35px;
	}

	/* }}} */

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

	let ID = 0

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
				smaller__: false,
				id__: ID++,
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

		mounted() {
			this.executeCodeDebounced = debounce(this.__executeCode, this.debounce)

			let content = this.template

			const isSelector = /^[.#]/.test(this.template)

			// If template starts with . or #
			if (isSelector) {
				// consider it a selector from which to get the code from.
				const html = document.querySelector(this.template)
				if (!html) throw Error(`${this.template} is not found`)

				content = unescape(html.innerHTML)
			}

			if (content) {
				this.initialValue = content
				this.editorValue = content
				this.__executeCode()
				this.$emit('input', content)
			}

			this.resizeObserver = new ResizeObserver(changes => {
				for (const change of changes) {
					let width = 0

					// Use the newer API if available.
					// NOTE We care about the contentBoxSize (not the
					// borderBoxSize) because the content box is the area in
					// which we're rendering visuals.
					if (change.contentBoxSize) {
						// Get the first item, because we're not expecting to
						// have a column layout.
						const {inlineSize, blockSize} = change.contentBoxSize[0]

						const isHorizontal = getComputedStyle(this.$el).writingMode.includes('horizontal')

						// If the text writing mode is horizontal, then inlinSize is
						// the width, otherwise in vertical writing mode it is the height.
						// For more details: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize#Syntax
						if (isHorizontal) width = inlineSize
						else width = blockSize
					}
					// Otherwise use the older API (possibly polyfilled)
					else {
						width = change.contentRect.width
					}

					this.__handleResize(width)
				}
			})

			this.resizeObserver.observe(this.$el)
		},

		methods: {
			rerun(event) {
				// prevent form submission.
				event.preventDefault()

				this.executeCodeDebounced.cancel()
				this.__executeCode()

				// force Vue to re-make the preview, in case no values for preview have changed
				this.forceRender++
			},

			reset() {
				// prevent form submission.
				event.preventDefault()

				this.__handleChange(this.initialValue)

				// force Vue to re-make the preview, in case no values for preview have changed
				this.forceRender++
			},

			__handleResize(width) {
				if (width < 800) this.smaller__ = true
				else this.smaller__ = false
			},

			__handleError(err) {
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

			__handleChange(val) {
				this.editorValue = val
				this.autorun && this.executeCodeDebounced()
				this.$emit('input', val)
			},

			__executeCode() {
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
