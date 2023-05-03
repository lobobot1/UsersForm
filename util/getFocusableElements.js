/**
 * Gets keyboard-focusable elements within a specified element
 * @param {HTMLElement} [element=document] element
 * @returns {Array}
 */
export default function getFocusableElements(element = document) {
  return [
    ...element.querySelectorAll(
      'a[href], button, input, textarea, select, details, embed, object, iframe, [tabindex]:not([tabindex="-1"])'
    ),
  ].filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      !el.getAttribute('aria-hidden') &&
      !(el.style.display === 'none')
  )
}
