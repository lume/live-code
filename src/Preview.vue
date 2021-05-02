<template>
	<div class="live-code-preview">
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
</style>

<script>
	import Vue from 'vue/dist/vue.common'

	export default {
		props: ['value', 'styles', 'keepData', 'mode'],

		created() {
			this.handleMessage = this.handleMessage.bind(this)
		},

		computed: {
			scopedStyle() {
				return this.styles ? insertScope(this.styles, `.${this.className}`) : ''
			},

			className() {
				// thi._uid is a property defined by Vue, unique to the instance.
				return 'live-code-scoped-' + this._uid
			},

			iframe() {
				return ['vue>iframe', 'script>iframe', 'html>iframe'].includes(this.mode)
			},
		},

		mounted() {
			this.$watch('value', this.renderCode, {immediate: true})

			window.addEventListener('message', this.handleMessage)
		},

		errorCaptured(error) {
			this.handleError(error)
		},

		methods: {
			handleError(error) {
				this.$emit('error', error)
			},

			handleMessage(msg) {
				if (!(this.$refs.el && msg.source === this.$refs.el.contentWindow)) return

				if (msg.data && msg.data.error) {
					this.handleError(msg.data.error)
				}
			},

			renderCode() {
				switch (this.mode) {
					case 'vue':
					case 'vue>iframe': {
						// Firefox needs the iframe to be loaded
						if (this.iframe && this.$refs.el.contentDocument.readyState !== 'complete') {
							// eslint-disable-next-line no-console
							this.$emit('error', new Error('Unable to render to iframe'))

							break
						}

						const value = this.value
						const lastData = this.keepData && this.codeVM && Object.assign({}, this.codeVM.$data)
						const container = this.iframe ? this.$refs.el.contentDocument.body : this.$refs.el

						if (this.codeVM) {
							this.codeVM.$destroy()
							container.removeChild(this.codeVM.$el)
						}

						this.codeEl = document.createElement('div')
						container.appendChild(this.codeEl)

						if (this.iframe) {
							const head = this.$refs.el.contentDocument.head
							if (this.styleEl) {
								head.removeChild(this.styleEl)
								for (const key in this.styleNodes) {
									head.removeChild(this.styleNodes[key])
								}
							}
							this.styleEl = document.createElement('style')
							this.styleEl.appendChild(document.createTextNode(this.styles))
							this.styleNodes = []
							const documentStyles = getDocumentStyle()
							for (const key in documentStyles) {
								this.styleNodes[key] = documentStyles[key].cloneNode(true)
								head.appendChild(this.styleNodes[key])
							}
							head.appendChild(this.styleEl)
						}

						try {
							const parent = this
							this.codeVM = new Vue({parent, ...value}).$mount(this.codeEl)

							if (lastData) {
								for (const key in lastData) {
									this.codeVM[key] = lastData[key]
								}
							}
						} catch (e) {
							this.$emit('error', e)
						}

						break
					}

					case 'script': {
						// nothing, see LiveCode component
						break
					}

					case 'script>iframe': {
						if (this.iframe) {
							/* eslint-disable no-useless-escape */
							const html = URL.createObjectURL(
								new Blob(
									[
										`<html>
										<head></head>
										<body>
											<script>${iframeErrorHandler.toString()}<\/script>
											<script>
											${this.value}
											<\/script>
										</body>
									</html>`,
									],
									{type: 'text/html'},
								),
							)

							this.$refs.el.src = html
						}

						break
					}

					case 'html>iframe': {
						if (this.iframe) {
							/* eslint-disable no-useless-escape */
							const html = URL.createObjectURL(
								new Blob([`<script>${iframeErrorHandler.toString()}<\/script>` + this.value], {
									type: 'text/html',
								}),
							)

							this.$refs.el.src = html
						}

						break
					}
				}
			},
		},
	}

	function insertScope(style, scope) {
		const regex = /(^|\})\s*([^{]+)/g

		return style.trim().replace(regex, (m, g1, g2) => {
			return g1 ? `${g1} ${scope} ${g2}` : `${scope} ${g2}`
		})
	}

	function getDocumentStyle() {
		const links = document.querySelectorAll('link[rel="stylesheet"]')
		const styles = document.querySelectorAll('style')
		return Array.from(links).concat(Array.from(styles))
	}

	const iframeErrorHandler = /*js*/ `
		function onError(e) {
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
	`
</script>
