# @lume/live-code

A `<live-code>` HTML element that gives you a code editor with live results as you type.

<a href="https://codepen.io/trusktr/pen/PogvVBj" target="_blank">
<img width="801" alt="Screenshot 2024-05-01 at 3 34 28 PM" src="https://github.com/lume/live-code/assets/297678/177d0cd8-118e-416d-9b0f-bb9237b3ce9f">
</a>

#### `npm install @lume/live-code`

Compatible with Solid.js, Svelte, Vue, Angular, Ember, jQuery, React, Astro, Qwik.js, and every other web framework or library for creating HTML-based applications.

## Examples:

- CodePen: https://codepen.io/trusktr/pen/PogvVBj
- Live demos on Lume's docs site are made with `<live-code>`: https://docs.lume.io/examples/hello-world/

## Run the examples

```
npm install && npm start
```

## Usage

Specify content with the `content` attribute:

```html
<live-code content="console.log('hello')" mode="script>iframe" />

<script type="importmap">
	... Set up an import map, or if you use a build tool like Webpack, Vite, Parcel, Rollup,
	 esbuild, swc, etc, skip this part. See examples/index.html for an importmap example, or
	 use a tool to generate an import map such as @jsenv/importmap-node-module. ...
</script>

<script type="module">
	import '@lume/live-code' // defines the element
</script>
```

Specify content with the `content` property:

```html
<live-code id="editor" mode="script>iframe" />

<script type="importmap">
	...
</script>

<script type="module">
	import '@lume/live-code' // defines the element

	const editor = document.querySelector('#editor')
	editor.content = `
    if (true)
      console.log('hello')
  `
</script>
```

The `content` attribute or JS property is more useful for short pieces of text,
or for programmatically setting from a string, and with template systems that
set attributes from JS variables.

Here's a JSX example (useful in React, Preact, Solid.js, etc, requires using a compiler such as Babel, TypeScript, or ESBuild):

```js
function SomeComponent(props) {
	// Set the content from a variable.
	return <live-code content={props.someCode} />
}
```

Here's a Lit `html` example (does not require any build step):

```js
render() {
  return html`<live-code content=${this.someCode}></live-code>`
}
```

Here's a Solid.js `html` example in a Lume `Element` (does not require any build step):

```js
template() {
  return html`<live-code content=${() => this.someCode}></live-code>`
}
```

Etc. `<live-code>` can be used in Vue, Svelte, Angular, and all the rest.

Specify a file with the `src` attribute or JS property, and text content will be fetched from that file:

```html
<live-code src="./path/to/file.js" mode="script>iframe" />
```

Lastly, use a `<template>` to specify text content inline. This can be cleaner
than placing multiline text inside the `content` attribute by hand:

```html
<live-code>
	<template>
		<h1>Example</h1>
		<script>
			const h1 = document.querySelector('h1')
			h1.style.color = 'royalblue'
		</script>
	</template>
</live-code>
```

Note that if `src` or `content` are specified, those take priority over the
`<template>` method.

Note that `<template>` currently only works when it is initially present, but
not if it is added later. If you're doing things programmatically, then send the
content in via the `content` property instead of appending a `<template>` (f.e.
`editor.content = template.innerHTML`).

### Attributes

Each attribute has a respective JS property of the same name (but camelCase instead of dash-case).

- `content` - Either a string of text, or a class or ID selector starting with
  `.` or `#`. The given text string, or the text content of the selected element,
  will appear in the editor. Any time the user resets the editor with the Reset
  button or `reset()` method, the text in the editor will reset to the initial
  value specified by this.
  - Default: `""` which is ignored.
- `src` - Specify a file from which to get text content from. If `content` is
  also specified, content loaded from `src` will have priority and `content` will
  be overridden.
  - Default: `""` which is ignored.
- `autorun` - A boolean. If true, editing the text will cause the preview area
  to automatically re-run based on the new content. The `Rerun` button will always force a
  rerun.
  - Default: `true`.
- `strip-indent` - A boolean. If true, the given code will be unindented, which
  is useful for template strings that are indented within the source where they
  are defined.
  - Default: `true`.
- `trim` - A boolean. If true, leading and trailing white space will be removed.
  - Default: `true`.
- `debounce` - A number. If `autorun` is true, then autorun is debounced by
  this amount in milliseconds after a user types into the code editor.
  - Default: `1000`.
- `mode` - The mode specifies which type of content the editor will execute.
  Possible values are the following strings:

  - `"html>iframe"` - The content will be treated as HTML and placed in an iframe.
  - `"script>iframe"` - The content is executed as a `<script>` inside an iframe.

  Default: `"html>iframe"`

## Methods

### `reset()`

Resets the text content back to the original before it was modified. This is the same thing the `Reset` button does.

### `copy()`

Copy the current text to the system clipboard. This is the same thing the `Copy` button does.

### `rerun()`

Reruns the live output. This is the same thing the `Rerun` button does.

### `toggleFullscreen()`

Toggles fullscreen mode. This is the same thing the `Toggle Fullscreen` button does.
