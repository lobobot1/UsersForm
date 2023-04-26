export class HttpError extends Error {
  /**
   * @param {object} options
   * @param {string} [options.message]
   * @param {number} statusCode
   */
  constructor({ message, statusCode }) {
    super(message || '')
    this.name = 'HttpError'
    this.statusCode = statusCode

    if (!message) {
      switch (statusCode) {
        case 404:
          this.message = 'What you were looking for was not found'
          break
        case 403:
          this.message = 'You do not have permission to perform this action'
          break
        case 401:
          this.message = 'You are not authorized to perform this action'
          break
        default:
          this.message = 'An error occurred while communicating with the server'
      }
    }
  }
}
