import { Money } from "../../domain/value-objects/Money";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";

import { PrismaTransferRepository }
from "../../infrastructure/repositories/PrismaTransferRepository";

export class TransferFundsUseCase {

  constructor(
    private accountRepository: IAccountRepository,
    private transferRepository: PrismaTransferRepository
  ) {}

  async execute(
    senderId: string,
    receiverId: string,
    amountInCents: number
  ): Promise<void> {

    if (senderId === receiverId) {
      throw new Error(
        "Transferência para mesma conta"
      );
    }

    const sender =
      await this.accountRepository.findById(
        senderId
      );

    const receiver =
      await this.accountRepository.findById(
        receiverId
      );

    if (!sender) {
      throw new Error(
        "Conta origem não encontrada"
      );
    }

    if (!receiver) {
      throw new Error(
        "Conta destino não encontrada"
      );
    }

    const amount =
      new Money(amountInCents);

    sender.debit(amount);

    receiver.credit(amount);

    await this.transferRepository.transfer(
      sender.id,
      receiver.id,
      amount.value
    );

  }

}