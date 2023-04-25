export class HttpError extends Error {
  /**
   * @param {object} options
   * @param {string} [options.message]
   * @param {number} statusCode
   */
  constructor({ message, statusCode }) {
    super(message || "");
    this.name = "HttpError";
    this.statusCode = statusCode;

    if (!message) {
      switch (statusCode) {
        case 404:
          this.message = "No se encontró lo que estaba buscando";
          break;
        case 403:
          this.message = "No tiene permiso para realizar esta acción";
          break;
        case 401:
          this.message = "No está autorizado para realizar esta acción";
          break;
        default:
          this.message = "Ocurrió un error al comunicarse con el servidor";
      }
    }
  }
}
