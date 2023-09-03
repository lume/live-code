<template>
	<div class="live-code-editor line-numbers">
		<!-- NOTE, syntax highlight (Prism) doesn't update unless there's a v-model
		specified, so we made a dummy one ("internalCode" property) rather than using
		the :code="value" attribute. -->
		<prism-editor v-model="internalCode" @change="handleChange" :language="syntax" :line-numbers="true" />
	</div>
</template>

<style>
	.live-code-editor {
		line-height: 1.2em;
	}

	.prism-editor-wrapper {
		background: #f7f7f7;
	}
	.prism-editor-wrapper pre {
		outline: none;
	}

	.prism-editor__line-numbers {
		padding-right: 5px;
		border-right: 1px solid gray;
		user-select: none;
		padding-bottom: 16px;
		margin-bottom: unset !important;
		box-sizing: border-box;
		min-height: unset !important;
		height: auto !important;
		min-height: 100% !important;
	}
</style>

<script>
	import PrismEditor from 'vue-prism-editor'
	import 'vue-prism-editor/dist/VuePrismEditor.css'

	// TODO migrate to CodeMirror v6, which now has amazing touch/mobile
	// support using contenteditable, among other great features over Prism
	// such as AST-based syntax handling, tooltips, etc.

	export default {
		components: {PrismEditor},
		props: ['value', 'options', 'mode'],

		data() {
			return {
				internalCode: this.value,
			}
		},

		watch: {
			value: {
				immediate: true,
				handler(val) {
					this.internalCode = val
				},
			},
		},

		computed: {
			syntax() {
				switch (true) {
					case startsWith(this.mode, 'html'): {
						return 'html'
					}
					case startsWith(this.mode, 'script'): {
						return 'js'
					}
					default: {
						return 'js'
					}
				}
			},
		},

		methods: {
			handleChange(code) {
				this.$emit('change', code)
			},
		},
	}

	function startsWith(string, ...strings) {
		return strings.some(s => string.startsWith(s))
	}
</script>
