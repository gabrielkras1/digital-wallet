import { Money } from "../../domain/value-objects/Money";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";

export class WithdrawUseCase {

  constructor(
    private accountRepository: IAccountRepository
  ) {}

  async execute(
    accountId: string,
    amountInCents: number
  ) {

    const account =
      await this.accountRepository.findById(accountId);

    if (!account) {
      throw new Error("Conta não encontrada");
    }

    account.debit(
      new Money(amountInCents)
    );

    await this.accountRepository.save(account);
  }
}