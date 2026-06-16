import { randomUUID } from "crypto";

import { Account } from "../../domain/entities/Account";
import { Document } from "../../domain/value-objects/Document";
import { Money } from "../../domain/value-objects/Money";

import { IAccountRepository } from "../../domain/repositories/IAccountRepository";

export class CreateAccountUseCase {

  constructor(
    private accountRepository: IAccountRepository
  ) {}

  async execute(document: string) {

    const doc = new Document(document);

    const exists =
      await this.accountRepository.findByDocument(
        doc.getValue()
      );

    if (exists) {
      throw new Error("Documento já cadastrado");
    }

    const account = new Account(
      randomUUID(),
      doc.getValue(),
      new Money(0)
    );

    await this.accountRepository.create(
      account
    );

    return {
      id: account.id,
      document: account.document,
      balance: 0
    };
  }
}