<template>
	<div>
		<h2>
			This example runs vanilla JavaScript in the current browsing context
			(careful, it can pollute the current context!)
		</h2>

		<code-vue :template="script" mode="script"></code-vue>

		<h2>
			This example runs vanilla JavaScript inside an iframe, in a script
			tag in the body. (safe, it won't pollute the current context)
		</h2>

		<code-vue :template="scriptIframe" mode="script>iframe"></code-vue>

		<h2>
			This example runs HTML code inside an iframe. (safe, it won't pollute the current context)
		</h2>

		<code-vue :template="htmlIframe" mode="html>iframe"></code-vue>

		<h2>
			This one runs a Vue component right inside the same DOM context.
		</h2>

		<code-vue :template="code" mode="vue"></code-vue>

		<h2>This one outputs Vue DOM into an iframe.</h2>

		<code-vue :template="code2" mode="vue>iframe"></code-vue>
	</div>
</template>

<script>
	import CodeVue from "./CodeVue";

	export default {
		components: { CodeVue },

		data: () => ({
			/* eslint-disable no-useless-escape */
            htmlIframe: `<style>
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
<\/script>
`,

			script: `window.buttonClick = () => {
    document.body.insertAdjacentHTML(
        'afterbegin',
        '<p>Polluted!</p>'
    )
}

// click the button to see that this example pollutes the environment...
document.body.insertAdjacentHTML(
    'afterbegin',
    '<button onclick="buttonClick()">Click to pollute...</button>'
)
`,

            scriptIframe: `document.head.innerHTML = \`
  <style>
    body {
      background: skyblue;
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
`,

			code: `<template>
    <h1>Count: {{count}}</h1>
</template>

<style>
    h1 {
        background: deeppink;
    }
</style>

<script>
    export default {
        data: () => ({
            count: 0,
        }),
        mounted() {
            setInterval(() => {
                this.count++
            }, 200);
        },
    }
<\/script>`,

			code2: `<template>
    <h1>Count: {{count}}</h1>
</template>

<style>
    /* style the body inside the iframe */
    body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    h1 {
        background: deeppink;
    }
</style>

<script>
    export default {
        data: () => ({
            count: 0,
        }),
        mounted() {
            setInterval(() => {
                this.count++
            }, 200);
        },
    }
<\/script>`
		})
	};
</script>