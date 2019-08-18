<script>
	import debounce from "lodash/debounce";
	import unescape from "lodash/unescape";
	import Editor from "./Editor";
	import Preview from "./Preview";
	import parser from "./utils/parser";
	import compiler from "./utils/compiler";

	const DEBOUNCE_TIME = 2000;

	export default {
		components: {
			Preview,
			Editor
		},

		props: {
			template: String,
			options: {},
			keepData: Boolean,
			value: String,
			scope: Object,
			iframe: Boolean,
			autorun: Boolean,

			// if autorun is true, then autorun is debounced by this amount after user
			// types into the code editor.
			debounce: { type: Number, default: 0 }
		},

		data() {
			return {
				content: "",
				preview: "",
				styles: "",
				error: "",
				currentValue: ""
			};
		},

		watch: {
			value: {
				immediate: true,
				handler(val) {
					this.currentValue = val;
					val && this.executeCodeDebounced();
				}
			}
		},

		created() {
			this.executeCodeDebounced = debounce(this.executeCode, DEBOUNCE_TIME);

			if (this.$isServer) return;

			let content = this.template;

			if (/^[.#]/.test(this.template)) {
				const html = document.querySelector(this.template);
				if (!html) throw Error(`${this.template} is not found`);

				content = unescape(html.innerHTML);
			}

			if (content) {
				this.currentValue = content;
				this.executeCode();
				this.$emit("input", content);
			}
		},

		methods: {
			handleError(err) {
				this.error = err;
			},

			handleChange(val) {
				this.currentValue = val;
				this.autorun && this.executeCodeDebounced();
				this.$emit("input", val);
			},

			rerun() {
				this.executeCodeDebounced.cancel();
				this.executeCode();
			},

			executeCode() {
				this.error = "";
				const result = parser(this.currentValue);

				if (result.error) {
					this.error = result.error.message;
					return;
				}

				const compiledCode = compiler(result, this.scope);

				if (compiledCode.error) {
					this.error = compiledCode.error.message;
					return;
				}

				this.content = result.content;
				this.preview = compiledCode.result;
				if (compiledCode.styles) this.styles = compiledCode.styles;
			}
		}
	};
</script>

<template>
	<div class="vuep">
		<editor
			ref="editor"
			class="vuep-editor"
			:value="currentValue"
			:options="options"
			@change="handleChange"
		>
		</editor>

		<div v-if="error" class="vuep-error">
			{{ error }}
		</div>

		<preview
			v-if="!error"
			class="vuep-preview"
			:value="preview"
			:styles="styles"
			:keep-data="keepData"
			:iframe="iframe"
			@error="handleError"
		>
		</preview>

		<button class="vuep-rerun" @click="rerun">
			rerun
		</button>
	</div>
</template>

<style lang="scss">
	.vuep {
		display: flex;
		font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
		position: relative;
		height: 400px;
		width: 100%;

		::-webkit-scrollbar-track {
			border-radius: 10px;
			background-color: #f5f5f5;
		}

		::-webkit-scrollbar {
			width: 8px;
			height: 8px;
			background-color: #f5f5f5;
		}

		::-webkit-scrollbar-thumb {
			border-radius: 8px;
			background-color: #bbb;
			transition: all 0.5s;
		}

		::-webkit-scrollbar-thumb:hover {
			border-radius: 8px;
			background-color: #777;
		}
	}

	.vuep-editor,
	.vuep-preview,
	.vuep-error {
		border-radius: 2px;
		height: inherit;
		margin-right: 10px;
		overflow: auto;
		width: 50%;

		&:last-child {
			margin-right: 0;
		}
	}

	.vuep-editor {
		line-height: 1.2em;
	}

	.vuep-error {
		color: #f66;
	}

	.vuep-preview,
	.vuep-error {
		border: 1px solid #eee;
		box-sizing: border-box;
		padding: 25px 35px;
	}

	.vuep-rerun {
		position: absolute;
		right: 0;
	}

	@media (max-width: 600px) {
		.vuep {
			display: block;
			height: auto;
		}

		.vuep-editor,
		.vuep-preview,
		.vuep-error {
			margin: 0 0 15px 0;
			height: 400px;
			width: 100%;
		}
	}
</style>
