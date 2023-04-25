import { HttpError } from "./http/HttpError";

/** @typedef {Parameters<typeof window.fetch>} FetchParams */
/** @typedef {FetchParams[0] Input} */
/** @typedef {{{ body?: unkown }} && Omit<RequestInit, 'body'>} CustomInit */

/**
 * @param {Input} input
 * @param {CustomInit} init
 */
export const fetch = async (input, { headers, body, ...init } = {}) => {
  const options = {
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
    ...init,
  };

  try {
    const res = await window.fetch(input, options);
    if (res.ok) return res.json();
    throw new HttpError({ statusCode: res.status });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Ocurrió un error al conectar con el servidor.");
    }
    if (error instanceof HttpError) {
      throw error;
    }
  }
};
