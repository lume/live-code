<template>
	<div class="line-numbers">
		<!-- NOTE, syntax highlight (Prism) doesn't update unless there's a v-model
		specified, so we made a dummy one ("internalCode" property) rather than using
		the :code="" attribute. -->
		<!-- :code="value" -->
		<prism-editor
			v-model="internalCode"
			@change="handleChange"
			language="html"
			:line-numbers="true"
		/>
	</div>
</template>

<style lang="scss">
	.prism-editor-wrapper {
		background: #f7f7f7;

		pre {
			outline: none;
		}
	}

	.prism-editor__line-numbers {
		padding-right: 5px;
		margin-right: 5px;
		border-right: 1px solid gray;
		user-select: none;
	}
</style>

<script>
	import PrismEditor from "vue-prism-editor";
	import "vue-prism-editor/dist/VuePrismEditor.css";

	// TODO options
	// const DEFAULT_OPTIONS = {
	// 	lineNumbers: true,
	// 	mode: "text/x-vue",
	// 	theme: "material",
	// 	tabSize: 2
	// };

	export default {
		components: { PrismEditor },
		props: ["value", "options"],

		data() {
			return {
				internalCode: this.value
			};
		},

		mounted() {
			// TODO options
			// this.currentOptions = Object.assign({}, DEFAULT_OPTIONS, this.options);
		},

		watch: {},

		methods: {
			handleChange(code) {
				this.$emit("change", code);
			}
		}
	};
</script>