# @lume/live-code

A `<live-code>` element that gives you a code editor with live results as you type.

Live examples: https://docs.lume.io/examples/hello-world/

#### `npm install @lume/live-code`

## Run the examples

```
npm install && npm start
```

## Usage

Specify content with the `content` attribute:

```html
<live-code content="console.log('hello')" mode="html>iframe" debounce="200" />
```

Specify content with the `content` property:

```html
<live-code id="editor" mode="html>iframe" debounce="200" />
<script>
  const editor = document.querySelector('#editor')
  editor.content = `
    if (true)
      console.log('hello')
  `
</script>
```

The `content` attribute or JS property is more useful for short pieces of text, or
for programmatically setting from a string. Here's a JSX example (useful in
React, Preact, Solid.js, etc):

```js
function SomeComponent(props) {
  return <live-code content={props.someCode} mode="html>iframe" />
}
```

Here's a Lit `html` example:

```js
render() {
  return html`<live-code content=${this.someCode} mode="html>iframe"></live-code>`
}
```

Here's a Solid.js `html` example in a Lume `Element`:

```js
template() {
  return html`<live-code content=${() => this.someCode} mode="html>iframe"></live-code>`
}
```

Etc. `<live-code>` can be used in Vue, Svelte, Angular, and all the rest.

Specify a file with the `src` attribute or JS property to have text content fetched from a file.

```html
<live-code src="./path/to/file.js" mode="script>iframe" debounce="200" />
```

Lastly, use a `<template>` to specify text content. This can be nicer than the
`content` attribute when the text is multiline:

```html
<live-code mode="html>iframe" debounce="200">
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

## Attributes

Each attribute has a respective JS property of the same name.

- `content` - Either a string of text, or a class or ID selector starting with
  `.` or `#`. The given text string, or the text content of the selected element,
  will appear in the editor. Any time the user resets the editor with the Reset
  button or `reset()` method, the text in the editor will reset to the initial
  value specified by this.
- `src` - Specify a file from which to get text content from. If `content` is
  also specified, content loaded from `src` will have priority and `content` will
  be overridden.
- `autorun` - A boolean. If true, editing the text will cause the preview area
  to automatically re-run based on the new content. The `Rerun` button will always force a
  rerun.
- `debounce` - A number. If `autorun` is `true`, then the automatic re-run will
  happen only after a delay (as specified by this prop) after the user has stopped
  inputting text.
- `mode` - The mode specified which type of content the editor will execute.
  Possible values are the following strings:
  - `"html>iframe"` - The content will be treated as HTML and placed in an iframe.
  - `"script>iframe"` - The content is executed as a `<script>` inside an iframe.

## Methods

### `reset()`

Resets the text content back to the original before it was modified. This is the same thing the `Reset` button does.

### `copy()`

Copy the current text to the system clipboard. This is the same thing the `Copy` button does.

### `rerun()`

Reruns the live output. This is the same thing the `Rerun` button does.

### `toggleFullscreen()`

Toggles fullscreen mode. This is the same thing the `Toggle Fullscreen` button does.
