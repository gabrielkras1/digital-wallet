import { prisma } from "../database/prisma/prisma";

import { Transaction } from "../../domain/entities/Transaction";

import { ITransactionRepository } from "../../domain/repositories/ITransactionRepository";

export class PrismaTransactionRepository
  implements ITransactionRepository {

  async save(
    transaction: Transaction
  ): Promise<void> {

    await prisma.transaction.create({
      data: {
        id: transaction.id,
        senderId: transaction.senderId,
        receiverId: transaction.receiverId,
        amount: transaction.amount,
        type: transaction.type
      }
    });

  }

  async findByAccountId(
    accountId: string
  ): Promise<any[]> {

    return prisma.transaction.findMany({
      where: {
        OR: [
          {
            senderId: accountId
          },
          {
            receiverId: accountId
          }
        ]
      },
      orderBy: {
        createdAt: "desc"
      }
    });

  }

}