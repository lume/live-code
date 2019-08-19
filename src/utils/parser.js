export default function (input) {
  const html = document.createElement('template')
  const content = html.innerHTML = input.trim()

  try {
    const template = html.content.querySelector('template')
    const script = html.content.querySelector('script')
    const styles = Array.prototype.slice.call(html.content.querySelectorAll('style')).map(n => n.innerHTML)

    if (!template && !script && !styles.length) {
      return {
        content,
        script: content
      }
    }

    return {
      // this hack seems to account for the code working when a closing script
      // tag is missing when a <script> is nested inside a <script> when using
      // script tags for the code templates instead of strings inside a
      // property.
      content: /<\/script>$/g.test(content) ? content : (content + '\n</script>'),

      template: template ? template.innerHTML : '',
      script: script ? script.innerHTML : '',
      styles: styles
    }
  } catch (error) {
    return { error }
  }
}
