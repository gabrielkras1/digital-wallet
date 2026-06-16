export class InvalidDocumentError extends Error {
  constructor() {
    super("Documento inválido");
  }
}