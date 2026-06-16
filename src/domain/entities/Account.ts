import { Money } from "../value-objects/Money";
import { InsufficientFundsError } from "../errors/InsufficientFundsError";

export class Account {
  constructor(
    public readonly id: string,
    public readonly document: string,
    private balance: Money
  ) {}

  credit(amount: Money): void {
    this.balance = this.balance.add(amount);
  }

  debit(amount: Money): void {
    if (amount.greaterThan(this.balance)) {
      throw new InsufficientFundsError();
    }

    this.balance = this.balance.subtract(amount);
  }

  getBalance(): Money {
    return this.balance;
  }
}