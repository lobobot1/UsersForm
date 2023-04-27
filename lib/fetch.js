import { HttpError } from './http/HttpError'

/** @typedef {Parameters<typeof window.fetch>} FetchParams */
/** @typedef {FetchParams[0] Input} */
/** @typedef {{{ body?: unkown }} && Omit<RequestInit, 'body'>} CustomInit */

/**
 * @param {Input} input
 * @param {CustomInit} init
 */
export const fetch = async (input, { headers, body, ...init } = {}) => {
  const options = {
    headers: { 'content-type': 'application/json', ...headers },
    body: JSON.stringify(body),
    ...init,
  }

  try {
    const res = await window.fetch(input, options)
    const json = await res.json()
    if (res.ok) return json
    throw new HttpError({ statusCode: res.status, message: json.message })
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Something went wrong. Try again.')
    }
    if (error instanceof HttpError) {
      throw error
    }
  }
}
