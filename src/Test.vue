<template>
	<code-vue :options="{ theme: 'base16-light' }" :template="code"></code-vue>
</template>

<script>
	import CodeVue from "./CodeVue";

	export default {
		components: { CodeVue },

		data: () => ({
			/* eslint-disable no-useless-escape */
            code:
`<template>
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
            }, 1000);
        },
    }
<\/script>`
		})
	};
</script>