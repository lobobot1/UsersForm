/**
 * @param {string[]} items
 * @returns {string}
 */
export default function formatList(items) {
  const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  })
  return formatter.format(items)
}
