# @lume/live-code

A Vue component that gives you a live code editor to edit snippets of code and see
the live results as you type.

#### `npm install @lume/live-code`

## Run the examples

```
npm install && npm start
```

## Usage

```html
<template>
  <live-code :template="codeString" mode="html>iframe" :debounce="200" />
</template>
```

### Props

- `template` - Either a string of code, or a class or ID selector starting with `.` or `#`. The given code string, or the text content of the selected element, will appear in the code editor. Any time the user resets the code editor, the code in the editor will reset to the initial value specified by this.
- `autorun` - A boolean. If true, editing the code will cause the preview area to automatically re-run the new code.
- `debounce` - A number. If `autorun` is `true`, then the automatic re-run will happen only after a delay (as specified by this prop) after the user has stopped inputting text.
- `mode` - The mode specified which type of code the editor will execute. Possible values are the following strings:
  - `"html>iframe"` - The code will be treated as HTML, and executed in an iframe.
  - `"vue"` - The code will treated as a single-file Vue component with a `<template>`, `<style>` and `<script>`. The component will be mounted inside the preview area, and not in an iframe.
  - `"vue>iframe"` - Similar to `"vue"`, but the component is output to an iframe.
  - `"script"` - The code is treated as a script, and executed right in the same context as the page. It can modify anything on the page!
  - `"script>iframe"` - The code is executed as a `<script>` inside an iframe. It can not modify the original page.
