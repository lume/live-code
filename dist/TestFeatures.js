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
import { Element, element } from '@lume/element';
import html from 'solid-js/html';
import './LiveCode.js';
import { stripIndent } from './stripIndent.js';
let TestFeatures = (() => {
    let _classDecorators = [element('test-features')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Element;
    var TestFeatures = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TestFeatures = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
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
	`).trim();
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
	`).trim();
        template = () => html `
		<div>
			<h2>This example runs JavaScript code inside an iframe, in a script tag in the body.</h2>

			<live-code content=${this.scriptIframe} mode="script>iframe"></live-code>

			<h2>This example runs HTML code inside an iframe.</h2>

			<live-code content=${this.htmlIframe} mode="html>iframe"></live-code>

			<h2>Hide the editor, show only the preview.</h2>

			<live-code editor-hidden content=${this.htmlIframe} mode="html>iframe"></live-code>
		</div>
	`;
    };
    return TestFeatures = _classThis;
})();
export { TestFeatures };
//# sourceMappingURL=TestFeatures.js.map