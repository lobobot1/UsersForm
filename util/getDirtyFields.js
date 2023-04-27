/**
 * @template {object} T
 * @param {T} data
 * @param {{ [Prop in keyof T]?: boolean }} dirtyFields
 * @returns {Partial<T>}
 */
export function getDirtyFields(data, dirtyFields) {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => dirtyFields[key])
  )
}
