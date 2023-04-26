import CryptoJS from 'crypto-js'
const { SECRET } = process.env

/**
 *  Encrypt function, return an string hashed with *SHA-256*
 * @param { string } msg String that to hash
 * @returns { string } string with hash
 */
export function encrypt(msg) {
  const hashed = CryptoJS.SHA256(msg).toString()
  // pure text , SECRET text
  return hashed
}

/**
 *  Encrypt function, return an string hashed with *HmacSHA256*
 * @param {string} msg  HmacSHA256
 * @returns {string} string with hash hashed
 */
export function encryptToSaveDB(msg) {
  if (!SECRET)
    throw new Error('Not SECRET encrypt environment variables configured')
  const k = SECRET
  return CryptoJS.HmacSHA256(encrypt(msg), k).toString()
}

/**
 * Compare function, return true or false between a string and a *SHA-256* HASH,
 * @param { string } toCompare string
 * @param { string } encrypted string
 * @returns { boolean }
 */
export function compare(toCompare, encrypted) {
  const comparer = encryptToSaveDB(toCompare)
  return comparer === encrypted
}
