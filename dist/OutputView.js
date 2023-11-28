var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
import { Element, element, stringAttribute } from '@lume/element';
import html from 'solid-js/html';
import { createEffect } from 'solid-js';
export class OutputViewErrorEvent extends ErrorEvent {
    error;
    constructor(error) {
        super('error', {});
        this.error = error;
    }
}
let OutputView = (() => {
    let _classDecorators = [element('output-view')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Element;
    let _instanceExtraInitializers = [];
    let _value_decorators;
    let _value_initializers = [];
    let _mode_decorators;
    let _mode_initializers = [];
    var OutputView = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _value_decorators = [stringAttribute];
            _mode_decorators = [stringAttribute];
            __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: obj => "value" in obj, get: obj => obj.value, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, _value_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _mode_decorators, { kind: "field", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode, set: (obj, value) => { obj.mode = value; } }, metadata: _metadata }, _mode_initializers, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            OutputView = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        hasShadow = (__runInitializers(this, _instanceExtraInitializers), false);
        value = __runInitializers(this, _value_initializers, '');
        mode = __runInitializers(this, _mode_initializers, 'html>iframe');
        #iframe;
        connectedCallback() {
            super.connectedCallback();
            createEffect(() => {
                this.value;
                this.#renderCode();
            });
            window.addEventListener('message', this.#handleMessage);
        }
        #handleError(error) {
            this.dispatchEvent(new OutputViewErrorEvent(error));
        }
        #handleMessage = (msg) => {
            console.log('MESSAGE >>>>>>>>>', msg);
            if (!(this.#iframe && msg.source === this.#iframe.contentWindow))
                return;
            if (msg.data && msg.data.error) {
                this.#handleError(msg.data.error);
            }
        };
        #renderCode() {
            switch (this.mode) {
                case 'script>iframe': {
                    const html = URL.createObjectURL(new Blob([
                        /*html*/ `<html>
									<head></head>
									<body>
										<script>${iframeErrorHandler.toString()}</script>
										<script>
										${this.value}
										</script>
									</body>
								</html>`,
                    ], { type: 'text/html' }));
                    this.#iframe.src = html;
                    break;
                }
                case 'html>iframe': {
                    const html = URL.createObjectURL(new Blob([/*html*/ `<script>${iframeErrorHandler.toString()}</script>` + this.value], {
                        type: 'text/html',
                    }));
                    this.#iframe.src = html;
                    break;
                }
            }
        }
        template = () => html `
		<div class="live-code-preview">
			<iframe ref=${(e) => (this.#iframe = e)}></iframe>
		</div>
	`;
        css = /*css*/ `
		:host { display: contents; }

		.live-code-preview iframe {
			display: block;
			width: 100%;
			height: 100%;
			margin: 0;
			padding: 0;
			border: none;
		}

		.live-code-preview div {
			height: 100%;
		}

		.hidden {
			display: none !important;
		}
	`;
    };
    return OutputView = _classThis;
})();
export { OutputView };
const iframeErrorHandler = /*js*/ `
	function onError(e) {
		console.error('Error in <live-code> iframe:', e)

		let error;

		if (
			window.PromiseRejectionEvent &&
			e instanceof PromiseRejectionEvent
		) {
			if (e.reason instanceof Error) {
				error = {
					message: e.reason.message,
					stack: e.reason.stack
				};
			} else {
				error = {
					message: e.reason
				};
			}
		} else if (e.error) {
			error = {
				message: e.error.message,
				stack: e.error.stack
			};
		} else {
			error = {
				message: e.message
			};
		}

		const parentWindow = window.parent || window.opener;

		parentWindow.postMessage({ error });
	}

	window.addEventListener("error", onError);
	window.addEventListener("unhandledrejection", onError);
`;
//# sourceMappingURL=OutputView.js.map