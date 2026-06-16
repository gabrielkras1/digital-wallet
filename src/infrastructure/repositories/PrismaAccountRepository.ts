import { Account } from "../../domain/entities/Account";
import { Money } from "../../domain/value-objects/Money";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { prisma } from "../database/prisma/prisma";

export class PrismaAccountRepository
implements IAccountRepository {

  async findById(id: string): Promise<Account | null> {

    const account =
      await prisma.account.findUnique({
        where: { id }
      });

    if (!account) {
      return null;
    }

    return new Account(
      account.id,
      account.document,
      new Money(account.balance)
    );
  }

  async findByDocument(
    document: string
  ): Promise<Account | null> {

    const account =
      await prisma.account.findUnique({
        where: { document }
      });

    if (!account) {
      return null;
    }

    return new Account(
      account.id,
      account.document,
      new Money(account.balance)
    );
  }

  async create(account: Account): Promise<void> {

    await prisma.account.create({
      data: {
        id: account.id,
        document: account.document,
        balance: account.getBalance().value
      }
    });
  }

  async save(account: Account): Promise<void> {

    await prisma.account.update({
      where: {
        id: account.id
      },
      data: {
        balance: account.getBalance().value
      }
    });
  }

  async findAll() {

  const accounts =
    await prisma.account.findMany();

  return accounts.map(
    account =>
      new Account(
        account.id,
        account.document,
        new Money(account.balance)
      )
  );

}
}