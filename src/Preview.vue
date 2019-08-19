<template>
	<div>
		<iframe ref="el" v-if="iframe" :class="className"></iframe>

		<div ref="el" v-if="!iframe" :class="className">
			<!-- Workaround: component element needed because Vue templates don't
      allow style elements. https://stackoverflow.com/questions/49516424 -->
			<component :is="'style'">
				{{ scopedStyle }}
			</component>
		</div>
	</div>
</template>

<style>
	[class^="vuep-scoped-"] {
		height: inherit;
	}
</style>

<script>
	import Vue from "vue/dist/vue.common";

	export default {
		props: ["value", "styles", "keepData", "mode"],

		computed: {
			scopedStyle() {
				return this.styles
					? insertScope(this.styles, `.${this.className}`)
					: "";
			},

			className() {
				return "vuep-scoped-" + this._uid;
			},

			iframe() {
				return ["vue>iframe", "script>iframe", "html>iframe"].includes(this.mode);
			}
		},

		mounted() {
			this.$watch("value", this.renderCode, { immediate: true });

			// if (this.iframe) {
			// 	this.$refs.el.addEventListener("load", this.renderCode);
			// }
		},

		beforeDestroy() {
			// if (this.iframe) {
			// 	this.$refs.el.removeEventListener("load", this.renderCode);
			// }

			this.__iframeLoadListener &&
				this.$refs.el.removeEventListener(
					"load",
					this.__iframeLoadListener
				);
		},

		methods: {
			renderCode() {
				switch (this.mode) {
					case "vue":
					case "vue>iframe": {
						// Firefox needs the iframe to be loaded
						if (
							this.iframe &&
							this.$refs.el.contentDocument.readyState !== "complete"
						) {
							// eslint-disable-next-line no-console
							this.$emit(
								"error",
								new Error("Unable to render to iframe")
							);

							break;
						}

						const value = this.value;
						const lastData =
							this.keepData &&
							this.codeVM &&
							Object.assign({}, this.codeVM.$data);
						const container = this.iframe
							? this.$refs.el.contentDocument.body
							: this.$refs.el;

						if (this.codeVM) {
							this.codeVM.$destroy();
							container.removeChild(this.codeVM.$el);
						}

						this.codeEl = document.createElement("div");
						container.appendChild(this.codeEl);

						if (this.iframe) {
							const head = this.$refs.el.contentDocument.head;
							if (this.styleEl) {
								head.removeChild(this.styleEl);
								for (const key in this.styleNodes) {
									head.removeChild(this.styleNodes[key]);
								}
							}
							this.styleEl = document.createElement("style");
							this.styleEl.appendChild(
								document.createTextNode(this.styles)
							);
							this.styleNodes = [];
							const documentStyles = getDocumentStyle();
							for (const key in documentStyles) {
								this.styleNodes[key] = documentStyles[
									key
								].cloneNode(true);
								head.appendChild(this.styleNodes[key]);
							}
							head.appendChild(this.styleEl);
						}

						try {
							const parent = this;
							this.codeVM = new Vue({ parent, ...value }).$mount(
								this.codeEl
							);

							if (lastData) {
								for (const key in lastData) {
									this.codeVM[key] = lastData[key];
								}
							}
						} catch (e) {
							this.$emit("error", e);
						}

						break;
					}

					case "script": {
						// nothing, see CodeVue component
						break;
					}

					case "script>iframe": {
						if (this.iframe) {
							/* eslint-disable no-useless-escape */
							const html =
								"data:text/html," +
								encodeURIComponent(`<html>
  <head>
  </head>
  <body>
    <script>
${this.value}
    <\/script>
  </body>
	</html>
	`);

							this.$refs.el.src = html;
						}

						break;
					}

					case "html>iframe": {
						if (this.iframe) {
							/* eslint-disable no-useless-escape */
							const html =
								"data:text/html," +
								encodeURIComponent(`
${this.value}
	`);
							this.$refs.el.src = html;
						}

						break;
					}
				}
			}
		}
	};

	function insertScope(style, scope) {
		const regex = /(^|\})\s*([^{]+)/g;

		return style.trim().replace(regex, (m, g1, g2) => {
			return g1 ? `${g1} ${scope} ${g2}` : `${scope} ${g2}`;
		});
	}

	function getDocumentStyle() {
		const links = document.querySelectorAll('link[rel="stylesheet"]');
		const styles = document.querySelectorAll("style");
		return Array.from(links).concat(Array.from(styles));
	}
</script>