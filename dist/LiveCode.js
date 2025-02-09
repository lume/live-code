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
    let _content_decorators;
    let _content_initializers = [];
    let _content_extraInitializers = [];
    let _src_decorators;
    let _src_initializers = [];
    let _src_extraInitializers = [];
    let _stripIndent_decorators;
    let _stripIndent_initializers = [];
    let _stripIndent_extraInitializers = [];
    let _trim_decorators;
    let _trim_initializers = [];
    let _trim_extraInitializers = [];
    let _autorun_decorators;
    let _autorun_initializers = [];
    let _autorun_extraInitializers = [];
    let _autorunInView_decorators;
    let _autorunInView_initializers = [];
    let _autorunInView_extraInitializers = [];
    let _mode_decorators;
    let _mode_initializers = [];
    let _mode_extraInitializers = [];
    let _debounce_decorators;
    let _debounce_initializers = [];
    let _debounce_extraInitializers = [];
    var LiveCode = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _content_decorators = [stringAttribute];
            _src_decorators = [stringAttribute];
            _stripIndent_decorators = [booleanAttribute];
            _trim_decorators = [booleanAttribute];
            _autorun_decorators = [booleanAttribute];
            _autorunInView_decorators = [booleanAttribute];
            _mode_decorators = [stringAttribute];
            _debounce_decorators = [numberAttribute];
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _src_decorators, { kind: "field", name: "src", static: false, private: false, access: { has: obj => "src" in obj, get: obj => obj.src, set: (obj, value) => { obj.src = value; } }, metadata: _metadata }, _src_initializers, _src_extraInitializers);
            __esDecorate(null, null, _stripIndent_decorators, { kind: "field", name: "stripIndent", static: false, private: false, access: { has: obj => "stripIndent" in obj, get: obj => obj.stripIndent, set: (obj, value) => { obj.stripIndent = value; } }, metadata: _metadata }, _stripIndent_initializers, _stripIndent_extraInitializers);
            __esDecorate(null, null, _trim_decorators, { kind: "field", name: "trim", static: false, private: false, access: { has: obj => "trim" in obj, get: obj => obj.trim, set: (obj, value) => { obj.trim = value; } }, metadata: _metadata }, _trim_initializers, _trim_extraInitializers);
            __esDecorate(null, null, _autorun_decorators, { kind: "field", name: "autorun", static: false, private: false, access: { has: obj => "autorun" in obj, get: obj => obj.autorun, set: (obj, value) => { obj.autorun = value; } }, metadata: _metadata }, _autorun_initializers, _autorun_extraInitializers);
            __esDecorate(null, null, _autorunInView_decorators, { kind: "field", name: "autorunInView", static: false, private: false, access: { has: obj => "autorunInView" in obj, get: obj => obj.autorunInView, set: (obj, value) => { obj.autorunInView = value; } }, metadata: _metadata }, _autorunInView_initializers, _autorunInView_extraInitializers);
            __esDecorate(null, null, _mode_decorators, { kind: "field", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode, set: (obj, value) => { obj.mode = value; } }, metadata: _metadata }, _mode_initializers, _mode_extraInitializers);
            __esDecorate(null, null, _debounce_decorators, { kind: "field", name: "debounce", static: false, private: false, access: { has: obj => "debounce" in obj, get: obj => obj.debounce, set: (obj, value) => { obj.debounce = value; } }, metadata: _metadata }, _debounce_initializers, _debounce_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LiveCode = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        /** The text to put in the editor. */
        content = __runInitializers(this, _content_initializers, ''
        /**
         * A file from which to get code for the editor from. If given, takes
         * priority over the `code` value.
         */
        );
        /**
         * A file from which to get code for the editor from. If given, takes
         * priority over the `code` value.
         */
        src = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _src_initializers, ''
        /**
         * When true (default) common indentation will be removed. Useful for
         * example if the `content` property is being set with a template string and
         * the content is indented to make the outer code more readable but the
         * indentation is undersired in the result. Set the attribute
         * `strip-indent="false"` to disable.
         */
        ));
        /**
         * When true (default) common indentation will be removed. Useful for
         * example if the `content` property is being set with a template string and
         * the content is indented to make the outer code more readable but the
         * indentation is undersired in the result. Set the attribute
         * `strip-indent="false"` to disable.
         */
        stripIndent = (__runInitializers(this, _src_extraInitializers), __runInitializers(this, _stripIndent_initializers, true
        /**
         * When true (default) leading and trailing whitespace will be trimmed. Set
         * the attribute `trim="false"` to disable.
         */
        ));
        /**
         * When true (default) leading and trailing whitespace will be trimmed. Set
         * the attribute `trim="false"` to disable.
         */
        trim = (__runInitializers(this, _stripIndent_extraInitializers), __runInitializers(this, _trim_initializers, true
        /**
         * By default the live preview will update automatically (debounced) when
         * code in the editor is modified. Set to false to prevent automatic
         * running, and run only when the rerun button is clicked.
         */
        ));
        /**
         * By default the live preview will update automatically (debounced) when
         * code in the editor is modified. Set to false to prevent automatic
         * running, and run only when the rerun button is clicked.
         */
        autorun = (__runInitializers(this, _trim_extraInitializers), __runInitializers(this, _autorun_initializers, true
        /**
         * Only useful when `autorun` is true. When `autorun` is true, then if this
         * is true, the preview will only autorun if it is visible on screen (f.e.
         * not scrolled outside of the view). If this is false, then the preview
         * will autorun regardless if it is visible or not. If there are a lot of
         * examples on the page, running them all even if they are not visible could
         * be costly, and you may want to run only the ones that are in view.
         *
         * When true, any live code previews that go off screen will be discarded,
         * and automatically re-ran when they come back into view.
         */
        ));
        /**
         * Only useful when `autorun` is true. When `autorun` is true, then if this
         * is true, the preview will only autorun if it is visible on screen (f.e.
         * not scrolled outside of the view). If this is false, then the preview
         * will autorun regardless if it is visible or not. If there are a lot of
         * examples on the page, running them all even if they are not visible could
         * be costly, and you may want to run only the ones that are in view.
         *
         * When true, any live code previews that go off screen will be discarded,
         * and automatically re-ran when they come back into view.
         */
        autorunInView = (__runInitializers(this, _autorun_extraInitializers), __runInitializers(this, _autorunInView_initializers, true
        /**
         * Specify the editor mode:
         * - script
         * - script>iframe
         * - html>iframe
         */
        ));
        /**
         * Specify the editor mode:
         * - script
         * - script>iframe
         * - html>iframe
         */
        mode = (__runInitializers(this, _autorunInView_extraInitializers), __runInitializers(this, _mode_initializers, 'html>iframe'
        /**
         * If `autorun` is true, then autorun is debounced by this amount in
         * milliseconds after a user types into the code editor. Defaults to `1000`.
         */
        ));
        /**
         * If `autorun` is true, then autorun is debounced by this amount in
         * milliseconds after a user types into the code editor. Defaults to `1000`.
         */
        debounce = (__runInitializers(this, _mode_extraInitializers), __runInitializers(this, _debounce_initializers, 1000
        /////////////////////////
        // Private reactive state
        ));
        /////////////////////////
        // Private reactive state
        #_ = (__runInitializers(this, _debounce_extraInitializers), new ((() => {
            let _classDecorators = [reactive];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            let _error_decorators;
            let _error_initializers = [];
            let _error_extraInitializers = [];
            let _initialValue_decorators;
            let _initialValue_initializers = [];
            let _initialValue_extraInitializers = [];
            let _editorValue_decorators;
            let _editorValue_initializers = [];
            let _editorValue_extraInitializers = [];
            let _debouncedEditorValue_decorators;
            let _debouncedEditorValue_initializers = [];
            let _debouncedEditorValue_extraInitializers = [];
            let _smaller_decorators;
            let _smaller_initializers = [];
            let _smaller_extraInitializers = [];
            let _canView_decorators;
            let _canView_initializers = [];
            let _canView_extraInitializers = [];
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
                    _canView_decorators = [signal];
                    __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
                    __esDecorate(null, null, _initialValue_decorators, { kind: "field", name: "initialValue", static: false, private: false, access: { has: obj => "initialValue" in obj, get: obj => obj.initialValue, set: (obj, value) => { obj.initialValue = value; } }, metadata: _metadata }, _initialValue_initializers, _initialValue_extraInitializers);
                    __esDecorate(null, null, _editorValue_decorators, { kind: "field", name: "editorValue", static: false, private: false, access: { has: obj => "editorValue" in obj, get: obj => obj.editorValue, set: (obj, value) => { obj.editorValue = value; } }, metadata: _metadata }, _editorValue_initializers, _editorValue_extraInitializers);
                    __esDecorate(null, null, _debouncedEditorValue_decorators, { kind: "field", name: "debouncedEditorValue", static: false, private: false, access: { has: obj => "debouncedEditorValue" in obj, get: obj => obj.debouncedEditorValue, set: (obj, value) => { obj.debouncedEditorValue = value; } }, metadata: _metadata }, _debouncedEditorValue_initializers, _debouncedEditorValue_extraInitializers);
                    __esDecorate(null, null, _smaller_decorators, { kind: "field", name: "smaller", static: false, private: false, access: { has: obj => "smaller" in obj, get: obj => obj.smaller, set: (obj, value) => { obj.smaller = value; } }, metadata: _metadata }, _smaller_initializers, _smaller_extraInitializers);
                    __esDecorate(null, null, _canView_decorators, { kind: "field", name: "canView", static: false, private: false, access: { has: obj => "canView" in obj, get: obj => obj.canView, set: (obj, value) => { obj.canView = value; } }, metadata: _metadata }, _canView_initializers, _canView_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    class_1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
                error = __runInitializers(this, _error_initializers, '');
                initialValue = (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _initialValue_initializers, ''));
                editorValue = (__runInitializers(this, _initialValue_extraInitializers), __runInitializers(this, _editorValue_initializers, ''));
                debouncedEditorValue = (__runInitializers(this, _editorValue_extraInitializers), __runInitializers(this, _debouncedEditorValue_initializers, ''));
                smaller = (__runInitializers(this, _debouncedEditorValue_extraInitializers), __runInitializers(this, _smaller_initializers, false));
                canView = (__runInitializers(this, _smaller_extraInitializers), __runInitializers(this, _canView_initializers, null));
                constructor() {
                    __runInitializers(this, _canView_extraInitializers);
                }
            };
            return class_1 = _classThis;
        })())());
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
        #fullviewModalHost;
        #dialog;
        #toggleFullviewDialog() {
            if (this.#dialog.open) {
                document.body.removeAttribute('inert');
                this.#form.slot = '';
                this.#dialog.close();
            }
            else {
                if (!document.body.hasAttribute('inert'))
                    document.body.toggleAttribute('inert');
                this.#form.slot = 'fullscreen';
                this.#dialog.showModal();
            }
        }
        connectedCallback() {
            super.connectedCallback();
            // This is a fallback for browsers that don't have Fullscreen API,
            // but have <dialog> support (namely iOS Safari).
            if (!this.#fullviewModalHost.shadowRoot) {
                const root = this.#fullviewModalHost.attachShadow({ mode: 'open' });
                root.append(...html `
					<dialog ref=${(e) => (this.#dialog = e)}>
						<slot name="fullscreen"></slot>
					</dialog>

					<slot></slot>

					<style>
						dialog {
							width: 100%;
							height: 100%;
							padding: 0;
							margin: 0;
							max-width: unset;
							max-height: unset;
							border: none;
						}

						/*
						 * Make the backdrop bigger so that when iOS viewport
						 * resizes (when Safari UI auto-hides) we avoid
						 * revealing content underneath the modal.
					  	 */
						::backdrop {
							width: 150%;
							height: 150%;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							background: white;
						}
					</style>
				`);
                this.#dialog.addEventListener('touchmove', event => {
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
            this.createEffect(() => {
                this.#executeCodeDebounced = debounce(this.#executeCode, this.debounce);
            });
            this.createEffect(() => {
                if (this.src)
                    this.#loadCodeFromSrc();
                else if (this.content)
                    this.#loadCodeFromContent();
                else
                    this.#loadCodeFromTemplate();
            });
            this.createEffect(() => {
                if (!this.autorun)
                    return;
                if (this.autorunInView) {
                    const debouncedSetCanView = debounce(() => (this.#_.canView = true), 500);
                    const observer = new IntersectionObserver(entries => {
                        debouncedSetCanView.cancel();
                        for (const entry of entries) {
                            // Has come into view.
                            if (entry.isIntersecting) {
                                // on first run, show immediately if in view
                                if (this.#_.canView === null)
                                    this.#_.canView = true;
                                // otherwise debounce to avoid many editors causing a flood of network and CPU load when scrolling past them.
                                else
                                    debouncedSetCanView();
                            }
                            else {
                                this.#_.canView = false;
                            }
                        }
                    });
                    observer.observe(this);
                    onCleanup(() => {
                        debouncedSetCanView.cancel();
                        observer.disconnect();
                    });
                }
                else {
                    this.#_.canView = true;
                }
                this.createEffect(() => {
                    if (!this.#_.canView)
                        return;
                    this.createEffect(() => {
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
                    onCleanup(() => {
                        // Empty string causes OutputView to be empty (f.e. removes the iframe)
                        this.#_.debouncedEditorValue = '';
                    });
                });
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
                this.#form.requestFullscreen?.() ?? this.#form.webkitRequestFullscreen?.() ?? this.#toggleFullviewDialog();
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
        #executeCodeQuick = debounce(() => this.#executeCode(), 0);
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
        #loadCodeFromContent() {
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
        }
        #loadCodeFromTemplate() {
            const template = this.children[0]; // only child must be <template>
            if (!(template instanceof HTMLTemplateElement))
                return;
            const code = template.innerHTML;
            this.#applyCode(code);
        }
        #applyCode(code) {
            // for back compat
            if (code.includes('${host}')) {
                console.warn('<live-code>: ${host} is deprecated, use ${location.origin} instead');
                code = code.replaceAll('${host}', location.origin);
            }
            if (code.includes('href="/"')) {
                console.warn('<live-code>: href="/" is deprecated, use a <base> tag instead.');
                code = code.replaceAll('href="/"', `href="${location.origin}"`);
            }
            const keys = [
                'hash',
                'host',
                'hostname',
                'href',
                'origin',
                'pathname',
                'port',
                'protocol',
                'search',
            ];
            for (const key of keys)
                code = code.replace('${location.' + key + '}', window.location[key]);
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
		<div ref=${(e) => (this.#fullviewModalHost = e)} style="display: contents">
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
		</div>
	`;
        css = /*css*/ `
		:host {
			height: 420px;
		}

		.live-code {
			font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
			background: rgb(242, 241, 248); /* Background color from noctisLilac theme. */
			height: 100%;
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
			font-size: 1.5em;
			background: rgb(0 0 0 / 0.02)
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
			padding: 4px 6px;
			justify-content: flex-end;
			align-items: center;
		}

		.live-code-smaller .live-code-buttons {
			padding: 6px 9px;
		}

		.live-code-buttons button {
			display: block;
			border-radius: 3px;
			border: none;
			background: rgb(0 0 0 / 0.08);
			padding: 5px 10px;
			color: black;
			font-size: 1em;
			cursor: pointer;
			-webkit-user-select: none;
			user-select: none;
		}

		.live-code-smaller .live-code-buttons button {
			padding: 5px 10px;
			font-size: 1.2em;
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
		:host([editor-hidden]) .live-code-tab-label {background: none !important} /*ugh*/

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
function debounce(fn, time = 0) {
    let timeout = 0;
    const debounced = function (...args) {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => fn.apply(this, args), time);
    };
    debounced.cancel = () => clearTimeout(timeout);
    return debounced;
}
//# sourceMappingURL=LiveCode.js.map