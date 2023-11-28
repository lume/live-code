import {
	Element,
	element,
	numberAttribute,
	stringAttribute,
	booleanAttribute,
	type ElementAttributes,
} from '@lume/element'
import {signal, reactive, Effectful} from 'classy-solid'
import {batch, onCleanup} from 'solid-js'
import html from 'solid-js/html'
import {smoothy} from 'thememirror/dist/themes/smoothy.js' // Needs a fix for selection highlight. https://github.com/vadimdemedes/thememirror
import debounce from 'lodash-es/debounce.js'
import unescape from 'lodash-es/unescape.js'
import {CodeMirrorContentchangedEvent, type CodeMirror} from 'code-mirror-el'
import {type OutputViewErrorEvent} from './OutputView.js'
import type {EditorView} from 'codemirror'

export class LiveCodeContentchangedEvent extends CodeMirrorContentchangedEvent {
	constructor(view: EditorView) {
		super(view)
	}
}

let ID = 0

type LiveCodeAttributes = 'content' | 'src' | 'stripIndent' | 'trim' | 'autorun' | 'mode' | 'debounce'

export
@element('live-code')
class LiveCode extends Effectful(Element) {
	/** The text to put in the editor. */
	@stringAttribute content = ''

	/**
	 * A file from which to get code for the editor from. If given, takes
	 * priority over the `code` value.
	 */
	@stringAttribute src = ''

	/**
	 * When true (default) common indentation will be removed. Useful for
	 * example if the `content` property is being set with a template string and
	 * the content is indented to make the outer code more readable but the
	 * indentation is undersired in the result. Set the attribute
	 * `strip-indent="false"` to disable.
	 */
	@booleanAttribute stripIndent = true

	/**
	 * When true (default) leading and trailing whitespace will be trimmed. Set
	 * the attribute `trim="false"` to disable.
	 */
	@booleanAttribute trim = true

	/**
	 * By default the live preview will update automatically (debounced) when
	 * code in the editor is modified. Set to false to prevent automatic
	 * running, and run only when the rerun button is clicked.
	 */
	@booleanAttribute autorun = true

	/**
	 * Specify the editor mode:
	 * - script
	 * - script>iframe
	 * - html>iframe
	 */
	@stringAttribute mode: 'script>iframe' | 'html>iframe' = 'html>iframe'

	/**
	 * If `autorun` is true, then autorun is debounced by this amount in
	 * milliseconds after a user types into the code editor. Defaults to `1000`.
	 */
	@numberAttribute debounce = 1000

	/////////////////////////

	#_ = new (
		@reactive
		class {
			@signal error: string | Error = ''
			@signal initialValue = ''
			@signal editorValue = ''
			@signal debouncedEditorValue = ''
			@signal smaller = false
		}
	)()

	readonly #id = ID++

	#codemirror?: CodeMirror

	#resizeObserver = new ResizeObserver(changes => {
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

				const isHorizontal = getComputedStyle(this.#form).writingMode.includes('horizontal')

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

			this.#handleResize(width)
		}
	})

	#form!: HTMLFormElement

	connectedCallback() {
		super.connectedCallback()

		this.createEffect(() => {
			this.#executeCodeDebounced = debounce(this.#executeCode, this.debounce)
		})

		this.createEffect(() => {
			if (this.src) return

			let content = this.content

			const isSelector = /^[.#]/.test(this.content)

			console.log('is selector:', isSelector)

			// If code starts with . or #
			if (isSelector) {
				// consider it a selector from which to get the code from.
				const html = document.querySelector(this.content)
				if (!html) throw Error(`${this.content} is not found`)

				content = unescape(html.innerHTML)
			}

			this.#_.initialValue = content
			this.#_.editorValue = content
		})

		this.createEffect(() => {
			if (!this.src && !this.content) this.#loadCodeFromTemplate()
		})

		this.createEffect(() => {
			if (this.src) this.#loadCodeFromSrc()
		})

		this.createEffect(() => {
			if (!this.autorun) return

			// When initialValue is same as editorValue, it most likely means we
			// have started fresh or reset (most likely the user did not restore
			// the original code manually, but that could be possible too), so
			// start the example right away.
			if (this.#_.editorValue === this.#_.initialValue) this.#executeCodeQuick()
			// Otherwise we debounce while modifying code (it does not match
			// with initialValue).
			else this.#executeCodeDebounced()
		})

		this.#resizeObserver.observe(this.#form)
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.stopEffects()
		this.#resizeObserver.disconnect()
	}

	#onClickRerun = (event: Event) => {
		// prevent form submission.
		event.preventDefault()
		this.rerun()
	}

	rerun = () => {
		this.#executeCodeDebounced.cancel()
		this.#executeCodeQuick()
	}

	#onClickReset = (event: Event) => {
		// prevent form submission.
		event.preventDefault()
		this.reset()
	}

	reset = () => {
		batch(() => {
			this.#_.initialValue = this.#_.initialValue
			this.#_.editorValue = this.#_.initialValue
		})
	}

	#onClickCopy = (event: Event) => {
		event.preventDefault()
		this.copy()
	}

	copy = () => {
		navigator.clipboard.writeText(this.#codemirror?.currentContent ?? '')
	}

	#onClickToggleFullscreen = (event: Event) => {
		event.preventDefault()
		this.toggleFullscreen()
	}

	toggleFullscreen = () => {
		if (document.fullscreenElement) document.exitFullscreen()
		else this.#form.requestFullscreen()
	}

	#handleResize(width: number) {
		if (width < 800) this.#_.smaller = true
		else this.#_.smaller = false
	}

	#handleError(err: unknown) {
		// TODO For now we skip harmless ResizeObserver errors. Chrome has a
		// bug that causes this error to be emitted when it shouldn't. We
		// should remove this block once the bug is fixed. See
		// https://github.com/w3c/csswg-drafts/issues/5487
		// @ts-expect-error
		if (err && err.message && err.message.includes('ResizeObserver loop')) {
			console.error(err)
			return
		}

		// @ts-expect-error
		this.error = err && err.message ? (err.stack ? `ERROR: ${err.message}\n\n${err.stack}` : err.message) : err

		setTimeout(() => {
			// Throw it in a separate task so that it won't interrupt
			// live-code's operation, but the user can view it in console
			// if it is of any help.
			throw err
		}, 0)
	}

	#handleChange = debounce((event: CodeMirrorContentchangedEvent) => {
		this.#_.editorValue = event.content
		this.dispatchEvent(new LiveCodeContentchangedEvent(event.view))
	}, 100)

	#executeCodeDebounced = debounce(() => {})

	#executeCode() {
		this.#_.error = ''
		this.#_.debouncedEditorValue = this.#_.editorValue
	}

	#executeCodeQuick = debounce(this.#executeCode, 0)

	async #loadCodeFromSrc() {
		let cleaned = false
		onCleanup(() => (cleaned = true))
		const relativeUrl = new URL(this.src, window.location.href)
		const response = await fetch(relativeUrl.href)
		const code = await response.text()
		if (cleaned) return
		this.#applyCode(code)
	}

	#loadCodeFromTemplate() {
		const template = this.children[0] // only child must be <template>
		if (!(template instanceof HTMLTemplateElement)) return
		const code = template.innerHTML
		this.#applyCode(code)
	}

	#applyCode(code: string) {
		const host = window.location.origin
		code = code.replaceAll('${host}', host).replaceAll('href="/"', `href="${host}"`)
		const leadingEmptyLines = /^\s*[\r\n]+/
		code = code.replace(leadingEmptyLines, '')

		if (this.src) {
			const dirUrl = new URL(this.src, window.location.href).href
			code = `<base href="${dirUrl}" />\n` + code
		}

		batch(() => {
			this.#_.initialValue = code
			this.#_.editorValue = code
		})
	}

	get syntax() {
		return this.mode.startsWith('html') ? 'html' : 'js'
	}

	template = () => html`
		<form
			ref=${(e: HTMLFormElement) => (this.#form = e)}
			class=${() => 'live-code' + (this.#_.smaller ? ' live-code-smaller' : '')}
		>
			<input class="live-code-tab-input" type="radio" name="tab" id=${'live-code-tab-1-' + this.#id} checked />
			<input class="live-code-tab-input" type="radio" name="tab" id=${'live-code-tab-2-' + this.#id} />

			<label class="live-code-tab-label" for=${'live-code-tab-1-' + this.#id}>
				<span>CODE</span>

				<div class="live-code-edit-area live-code-tab-content">
					<div class="live-code-buttons">
						<div class="live-code-reset"><button onclick=${this.#onClickReset}>Reset</button></div>
						<div class="live-code-copy"><button onclick=${this.#onClickCopy}>Copy</button></div>
					</div>

					<div class="live-code-editor">
						<code-mirror
							ref=${(e: CodeMirror) => (this.#codemirror = e)}
							basic-setup
							content=${() => this.#_.initialValue}
							language=${() => this.syntax}
							strip-indent=${() => this.stripIndent}
							trim=${() => this.trim}
							on:contentchanged=${(event: CodeMirrorContentchangedEvent) => this.#handleChange(event)}
							stylesheet=${
								/*css*/ `
									.cm-focused {
										outline: none !important;
									}

									.cm-activeLine {
										/* The color from noctisLilac with an additional 0.4 opacity value */
										background-color: rgba(225, 222, 243, 0.4) !important;
									}
								`
							}
							xtheme=${smoothy}
							extensions=${[]}
						></code-mirror>
					</div>
				</div>
			</label>

			<label class="live-code-tab-label" for=${'live-code-tab-2-' + this.#id}>
				<span>RESULT</span>

				<div class="live-code-preview-area live-code-tab-content">
					<div class="live-code-buttons">
						<div class="live-code-rerun"><button onclick=${this.#onClickRerun}>Rerun</button></div>
						<div class="live-code-fullscreen">
							<button onclick=${this.#onClickToggleFullscreen}>Toggle Fullscreen</button>
						</div>
					</div>

					<div class=${() => 'live-code-error' + (!this.#_.error ? ' hidden' : '')}>
						<pre>${() => this.#_.error}</pre>
					</div>

					<output-view
						class=${() => (this.#_.error ? ' hidden' : '')}
						value=${() => this.#_.debouncedEditorValue}
						mode=${() => this.mode}
						on:error=${(e: OutputViewErrorEvent) => this.#handleError(e.error)}
					></output-view>
				</div>
			</label>
		</form>
	`

	css = /*css*/ `
		.live-code {
			font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
			background: rgb(242, 241, 248); /* Background color from noctisLilac theme. */
			height: 420px;
			width: 100%;
			position: relative;
			display: flex;

			--tab-color: deeppink;
			--tab-text-color: white;
		}

		.live-code-tab-input {
			display: none;
		}

		.live-code-smaller .live-code-tab-label {
			display: inline;
			width: 50%;
			height: 40px;
		}

		.live-code-smaller .live-code-tab-label > span {
			display: block;
			text-align: center;
			vertical-align: middle;
			line-height: 40px;
		}

		.live-code-smaller .live-code-tab-input:nth-child(1):checked ~ label:nth-child(3),
		.live-code-smaller .live-code-tab-input:nth-child(2):checked ~ label:nth-child(4) {
			background: var(--tab-color);
		}

		.live-code-smaller .live-code-tab-input:nth-child(1):checked ~ label:nth-child(3) > span,
		.live-code-smaller .live-code-tab-input:nth-child(2):checked ~ label:nth-child(4) > span {
			color: var(--tab-text-color);
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
			display: flex;
			gap: 5px;
			justify-content: flex-end;
			align-items: center;
		}

		.live-code-buttons button {
			display: block;
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

		code-mirror {
			height: 100%;
		}

		.live-code-error {
			color: #f66;
			padding: 25px 35px;
		}

		/* }}} */

		/* Show only preview */

		/* big mode */
		:host([editor-hidden]) [for^=live-code-tab-1] {display: none}
		:host([editor-hidden]) [for^=live-code-tab-2] {width: 100%}
		/* small mode */
		:host([editor-hidden]) .live-code-preview-area {display: flex !important; top: 0}
		:host([editor-hidden]) .live-code-tab-label > span {display: none}

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
	`
}

declare module 'solid-js' {
	namespace JSX {
		interface IntrinsicElements {
			'live-code': ElementAttributes<LiveCode, LiveCodeAttributes>
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'live-code': LiveCode
	}
}
