export class InsufficientFundsError extends Error {
  constructor() {
    super("Saldo insuficiente");
  }
}