var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Element, element, numberAttribute, stringAttribute, booleanAttribute, } from '@lume/element';
import { signal, reactive, Effectful } from 'classy-solid';
import { batch, onCleanup } from 'solid-js';
import html from 'solid-js/html';
import { smoothy } from 'thememirror/dist/themes/smoothy.js'; // Needs a fix for selection highlight. https://github.com/vadimdemedes/thememirror
import debounce from 'lodash-es/debounce.js';
import unescape from 'lodash-es/unescape.js';
import { CodeMirrorContentchangedEvent } from 'code-mirror-el';
import {} from './OutputView.js';
import { stripIndent } from './stripIndent.js';
export class LiveCodeContentchangedEvent extends CodeMirrorContentchangedEvent {
    constructor(view) {
        super(view);
    }
}
let ID = 0;
let LiveCode = (() => {
    let _classDecorators = [element('live-code')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Effectful(Element);
    let _instanceExtraInitializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _src_decorators;
    let _src_initializers = [];
    let _stripIndent_decorators;
    let _stripIndent_initializers = [];
    let _trim_decorators;
    let _trim_initializers = [];
    let _autorun_decorators;
    let _autorun_initializers = [];
    let _mode_decorators;
    let _mode_initializers = [];
    let _debounce_decorators;
    let _debounce_initializers = [];
    var LiveCode = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _content_decorators = [stringAttribute];
            _src_decorators = [stringAttribute];
            _stripIndent_decorators = [booleanAttribute];
            _trim_decorators = [booleanAttribute];
            _autorun_decorators = [booleanAttribute];
            _mode_decorators = [stringAttribute];
            _debounce_decorators = [numberAttribute];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _src_decorators, { kind: "field", name: "src", static: false, private: false, access: { has: obj => "src" in obj, get: obj => obj.src, set: (obj, value) => { obj.src = value; } }, metadata: _metadata }, _src_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _stripIndent_decorators, { kind: "field", name: "stripIndent", static: false, private: false, access: { has: obj => "stripIndent" in obj, get: obj => obj.stripIndent, set: (obj, value) => { obj.stripIndent = value; } }, metadata: _metadata }, _stripIndent_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _trim_decorators, { kind: "field", name: "trim", static: false, private: false, access: { has: obj => "trim" in obj, get: obj => obj.trim, set: (obj, value) => { obj.trim = value; } }, metadata: _metadata }, _trim_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _autorun_decorators, { kind: "field", name: "autorun", static: false, private: false, access: { has: obj => "autorun" in obj, get: obj => obj.autorun, set: (obj, value) => { obj.autorun = value; } }, metadata: _metadata }, _autorun_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _mode_decorators, { kind: "field", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode, set: (obj, value) => { obj.mode = value; } }, metadata: _metadata }, _mode_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _debounce_decorators, { kind: "field", name: "debounce", static: false, private: false, access: { has: obj => "debounce" in obj, get: obj => obj.debounce, set: (obj, value) => { obj.debounce = value; } }, metadata: _metadata }, _debounce_initializers, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LiveCode = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        /** The text to put in the editor. */
        content = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _content_initializers, ''
        /**
         * A file from which to get code for the editor from. If given, takes
         * priority over the `code` value.
         */
        ));
        /**
         * A file from which to get code for the editor from. If given, takes
         * priority over the `code` value.
         */
        src = __runInitializers(this, _src_initializers, ''
        /**
         * When true (default) common indentation will be removed. Useful for
         * example if the `content` property is being set with a template string and
         * the content is indented to make the outer code more readable but the
         * indentation is undersired in the result. Set the attribute
         * `strip-indent="false"` to disable.
         */
        );
        /**
         * When true (default) common indentation will be removed. Useful for
         * example if the `content` property is being set with a template string and
         * the content is indented to make the outer code more readable but the
         * indentation is undersired in the result. Set the attribute
         * `strip-indent="false"` to disable.
         */
        stripIndent = __runInitializers(this, _stripIndent_initializers, true
        /**
         * When true (default) leading and trailing whitespace will be trimmed. Set
         * the attribute `trim="false"` to disable.
         */
        );
        /**
         * When true (default) leading and trailing whitespace will be trimmed. Set
         * the attribute `trim="false"` to disable.
         */
        trim = __runInitializers(this, _trim_initializers, true
        /**
         * By default the live preview will update automatically (debounced) when
         * code in the editor is modified. Set to false to prevent automatic
         * running, and run only when the rerun button is clicked.
         */
        );
        /**
         * By default the live preview will update automatically (debounced) when
         * code in the editor is modified. Set to false to prevent automatic
         * running, and run only when the rerun button is clicked.
         */
        autorun = __runInitializers(this, _autorun_initializers, true
        /**
         * Specify the editor mode:
         * - script
         * - script>iframe
         * - html>iframe
         */
        );
        /**
         * Specify the editor mode:
         * - script
         * - script>iframe
         * - html>iframe
         */
        mode = __runInitializers(this, _mode_initializers, 'html>iframe'
        /**
         * If `autorun` is true, then autorun is debounced by this amount in
         * milliseconds after a user types into the code editor. Defaults to `1000`.
         */
        );
        /**
         * If `autorun` is true, then autorun is debounced by this amount in
         * milliseconds after a user types into the code editor. Defaults to `1000`.
         */
        debounce = __runInitializers(this, _debounce_initializers, 1000
        /////////////////////////
        );
        /////////////////////////
        #_ = new ((() => {
            let _classDecorators = [reactive];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _instanceExtraInitializers = [];
            let _error_decorators;
            let _error_initializers = [];
            let _initialValue_decorators;
            let _initialValue_initializers = [];
            let _editorValue_decorators;
            let _editorValue_initializers = [];
            let _debouncedEditorValue_decorators;
            let _debouncedEditorValue_initializers = [];
            let _smaller_decorators;
            let _smaller_initializers = [];
            var class_1 = class {
                static { _classThis = this; }
                static { __setFunctionName(_classThis, ""); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _error_decorators = [signal];
                    _initialValue_decorators = [signal];
                    _editorValue_decorators = [signal];
                    _debouncedEditorValue_decorators = [signal];
                    _smaller_decorators = [signal];
                    __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _instanceExtraInitializers);
                    __esDecorate(null, null, _initialValue_decorators, { kind: "field", name: "initialValue", static: false, private: false, access: { has: obj => "initialValue" in obj, get: obj => obj.initialValue, set: (obj, value) => { obj.initialValue = value; } }, metadata: _metadata }, _initialValue_initializers, _instanceExtraInitializers);
                    __esDecorate(null, null, _editorValue_decorators, { kind: "field", name: "editorValue", static: false, private: false, access: { has: obj => "editorValue" in obj, get: obj => obj.editorValue, set: (obj, value) => { obj.editorValue = value; } }, metadata: _metadata }, _editorValue_initializers, _instanceExtraInitializers);
                    __esDecorate(null, null, _debouncedEditorValue_decorators, { kind: "field", name: "debouncedEditorValue", static: false, private: false, access: { has: obj => "debouncedEditorValue" in obj, get: obj => obj.debouncedEditorValue, set: (obj, value) => { obj.debouncedEditorValue = value; } }, metadata: _metadata }, _debouncedEditorValue_initializers, _instanceExtraInitializers);
                    __esDecorate(null, null, _smaller_decorators, { kind: "field", name: "smaller", static: false, private: false, access: { has: obj => "smaller" in obj, get: obj => obj.smaller, set: (obj, value) => { obj.smaller = value; } }, metadata: _metadata }, _smaller_initializers, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    class_1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
                error = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _error_initializers, ''));
                initialValue = __runInitializers(this, _initialValue_initializers, '');
                editorValue = __runInitializers(this, _editorValue_initializers, '');
                debouncedEditorValue = __runInitializers(this, _debouncedEditorValue_initializers, '');
                smaller = __runInitializers(this, _smaller_initializers, false);
            };
            return class_1 = _classThis;
        })())();
        #id = ID++;
        #codemirror;
        #resizeObserver = new ResizeObserver(changes => {
            for (const change of changes) {
                let width = 0;
                // Use the newer API if available.
                // NOTE We care about the contentBoxSize (not the
                // borderBoxSize) because the content box is the area in
                // which we're rendering visuals.
                if (change.contentBoxSize) {
                    // Get the first item, because we're not expecting to
                    // have a column layout.
                    const { inlineSize, blockSize } = change.contentBoxSize[0];
                    const isHorizontal = getComputedStyle(this.#form).writingMode.includes('horizontal');
                    // If the text writing mode is horizontal, then inlinSize is
                    // the width, otherwise in vertical writing mode it is the height.
                    // For more details: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize#Syntax
                    if (isHorizontal)
                        width = inlineSize;
                    else
                        width = blockSize;
                }
                // Otherwise use the older API (possibly polyfilled)
                else {
                    width = change.contentRect.width;
                }
                this.#handleResize(width);
            }
        });
        #form;
        connectedCallback() {
            super.connectedCallback();
            this.createEffect(() => {
                this.#executeCodeDebounced = debounce(this.#executeCode, this.debounce);
            });
            this.createEffect(() => {
                if (this.src)
                    return;
                let content = this.content;
                const isSelector = /^[.#]/.test(this.content);
                // If code starts with . or #
                if (isSelector) {
                    // consider it a selector from which to get the code from.
                    const html = document.querySelector(this.content);
                    if (!html)
                        throw Error(`${this.content} is not found`);
                    content = unescape(html.innerHTML);
                }
                this.#applyCode(content);
            });
            this.createEffect(() => {
                if (!this.src && !this.content)
                    this.#loadCodeFromTemplate();
            });
            this.createEffect(() => {
                if (this.src)
                    this.#loadCodeFromSrc();
            });
            this.createEffect(() => {
                if (!this.autorun)
                    return;
                // When initialValue is same as editorValue, it most likely means we
                // have started fresh or reset (most likely the user did not restore
                // the original code manually, but that could be possible too), so
                // start the example right away.
                if (this.#_.editorValue === this.#_.initialValue) {
                    this.#executeCodeDebounced.cancel();
                    this.#executeCodeQuick();
                }
                // Otherwise we debounce while modifying code (it does not match
                // with initialValue).
                else {
                    this.#executeCodeDebounced();
                }
            });
            this.#resizeObserver.observe(this.#form);
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.stopEffects();
            this.#resizeObserver.disconnect();
        }
        #onClickRerun = (event) => {
            // prevent form submission.
            event.preventDefault();
            this.rerun();
        };
        rerun = () => {
            this.#executeCodeDebounced.cancel();
            this.#executeCodeQuick();
        };
        #onClickReset = (event) => {
            // prevent form submission.
            event.preventDefault();
            this.reset();
        };
        reset = () => {
            batch(() => {
                this.#_.initialValue = this.#_.initialValue;
                this.#_.editorValue = this.#_.initialValue;
            });
        };
        #onClickCopy = (event) => {
            event.preventDefault();
            this.copy();
        };
        copy = () => {
            navigator.clipboard.writeText(this.#codemirror?.currentContent ?? '');
        };
        #onClickToggleFullscreen = (event) => {
            event.preventDefault();
            this.toggleFullscreen();
        };
        toggleFullscreen = () => {
            if (document.fullscreenElement)
                document.exitFullscreen();
            else
                this.#form.requestFullscreen();
        };
        #handleResize(width) {
            if (width < 800)
                this.#_.smaller = true;
            else
                this.#_.smaller = false;
        }
        #handleError(err) {
            // TODO For now we skip harmless ResizeObserver errors. Chrome has a
            // bug that causes this error to be emitted when it shouldn't. We
            // should remove this block once the bug is fixed. See
            // https://github.com/w3c/csswg-drafts/issues/5487
            // @ts-expect-error
            if (err && err.message && err.message.includes('ResizeObserver loop')) {
                console.error(err);
                return;
            }
            // @ts-expect-error
            this.error = err && err.message ? (err.stack ? `ERROR: ${err.message}\n\n${err.stack}` : err.message) : err;
            setTimeout(() => {
                // Throw it in a separate task so that it won't interrupt
                // live-code's operation, but the user can view it in console
                // if it is of any help.
                throw err;
            }, 0);
        }
        #handleChange = debounce((event) => {
            this.#_.editorValue = event.content;
            this.dispatchEvent(new LiveCodeContentchangedEvent(event.view));
        }, 100);
        #executeCodeDebounced = debounce(() => { });
        #executeCode() {
            this.#_.error = '';
            this.#_.debouncedEditorValue = this.#_.editorValue;
        }
        #executeCodeQuick = debounce(this.#executeCode, 0);
        async #loadCodeFromSrc() {
            let cleaned = false;
            onCleanup(() => (cleaned = true));
            const relativeUrl = new URL(this.src, window.location.href);
            const response = await fetch(relativeUrl.href);
            const code = await response.text();
            if (cleaned)
                return;
            this.#applyCode(code);
        }
        #loadCodeFromTemplate() {
            const template = this.children[0]; // only child must be <template>
            if (!(template instanceof HTMLTemplateElement))
                return;
            const code = template.innerHTML;
            this.#applyCode(code);
        }
        #applyCode(code) {
            const host = window.location.origin;
            code = code.replaceAll('${host}', host).replaceAll('href="/"', `href="${host}"`);
            // FIXME we rely on this so that live preview will not run twice
            // initially. Instead, we need to update <code-mirror> so that it does
            // not emit a contentchanged event when the value is being set, only
            // when being modified by something else (like the user typing)
            if (this.stripIndent)
                code = stripIndent(code);
            if (this.trim)
                code = code.trim();
            if (this.src) {
                const dirUrl = new URL(this.src, window.location.href).href;
                code = `<base href="${dirUrl}" />\n` + code;
            }
            batch(() => {
                this.#_.initialValue = code;
                this.#_.editorValue = code;
            });
        }
        get syntax() {
            return this.mode.startsWith('html') ? 'html' : 'js';
        }
        template = () => html `
		<form
			ref=${(e) => (this.#form = e)}
			class=${() => 'live-code' + (this.#_.smaller ? ' live-code-smaller' : '')}
		>
			<input class="live-code-tab-input" type="radio" name="tab" id=${'live-code-tab-1-' + this.#id} />
			<input class="live-code-tab-input" type="radio" name="tab" id=${'live-code-tab-2-' + this.#id} checked />

			<label class="live-code-tab-label" for=${'live-code-tab-1-' + this.#id}>
				<span>CODE</span>

				<div class="live-code-edit-area live-code-tab-content">
					<div class="live-code-buttons">
						<div class="live-code-reset"><button onclick=${this.#onClickReset}>Reset</button></div>
						<div class="live-code-copy"><button onclick=${this.#onClickCopy}>Copy</button></div>
					</div>

					<div class="live-code-editor">
						<code-mirror
							ref=${(e) => (this.#codemirror = e)}
							basic-setup
							content=${() => this.#_.initialValue}
							language=${() => this.syntax}
							strip-indent=${() => this.stripIndent}
							trim=${() => this.trim}
							on:contentchanged=${(event) => this.#handleChange(event)}
							stylesheet=${
        /*css*/ `
									.cm-focused {
										outline: none !important;
									}

									.cm-activeLine {
										/* The color from noctisLilac with an additional 0.4 opacity value */
										background-color: rgba(225, 222, 243, 0.4) !important;
									}
								`}
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
						on:error=${(e) => this.#handleError(e.error)}
					></output-view>
				</div>
			</label>
		</form>
	`;
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
	`;
    };
    return LiveCode = _classThis;
})();
export { LiveCode };
//# sourceMappingURL=LiveCode.js.map