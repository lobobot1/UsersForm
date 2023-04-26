/**
 * Check if str is a valid uuid
 * @param { string } str
 * @returns
 */
export default function isUUID(str) {
  const regex =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/

  return regex.test(str)
}
