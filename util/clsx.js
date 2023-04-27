/**
 * Filters falsy values from given array
 * @param {(string | false | undefined | null)[]} classes
 * @returns Joined classes
 */
export function clsx(classes) {
  return classes.filter((c) => c).join(' ')
}
