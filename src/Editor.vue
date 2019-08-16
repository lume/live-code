<template>
	<div>
		<textarea ref="textarea" v-model="value"></textarea>
	</div>
</template>

<script>
	import CodeMirror from "codemirror";

	const DEFAULT_OPTIONS = {
		lineNumbers: true,
		mode: "text/x-vue",
		theme: "material",
		tabSize: 2
	};

	export default {
		props: ["value", "options"],

		mounted() {
			this.currentOptions = Object.assign({}, DEFAULT_OPTIONS, this.options);
			this.editor = CodeMirror.fromTextArea(
				this.$refs.textarea,
				this.currentOptions
			);
			this.editor.on("change", this.handleChange);
		},

		watch: {
			value(val) {
				val !== this.editor.getValue() && this.editor.setValue(val);
			}
		},

		methods: {
			handleChange() {
				/* istanbul ignore next */
				this.$emit("change", this.editor.getValue());
			}
		}
	};
</script>