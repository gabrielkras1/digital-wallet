import { Money } from "../../domain/value-objects/Money";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";
import {
  Transaction,
  TransactionType
} from "../../domain/entities/Transaction";

export class TransferFundsUseCase {

  constructor(
    private accountRepository: IAccountRepository,
    private transactionRepository: ITransactionRepository
  ) {}

  async execute(
    senderId: string,
    receiverId: string,
    amountInCents: number
  ): Promise<void> {

    if (senderId === receiverId) {
      throw new Error("Transferência para mesma conta");
    }

    const sender =
      await this.accountRepository.findById(senderId);

    const receiver =
      await this.accountRepository.findById(receiverId);

    if (!sender) {
      throw new Error("Conta origem não encontrada");
    }

    if (!receiver) {
      throw new Error("Conta destino não encontrada");
    }

    const amount = new Money(amountInCents);

    sender.debit(amount);

    receiver.credit(amount);

    await this.accountRepository.save(sender);
    await this.accountRepository.save(receiver);

    await this.transactionRepository.save(
      new Transaction(
        crypto.randomUUID(),
        senderId,
        receiverId,
        amountInCents,
        TransactionType.TRANSFER,
        new Date()
      )
    );
  }
}