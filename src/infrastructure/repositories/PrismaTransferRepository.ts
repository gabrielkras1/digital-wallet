import crypto from "crypto";
import { prisma } from "../database/prisma/prisma";

export class PrismaTransferRepository {

  async transfer(
    senderId: string,
    receiverId: string,
    amount: number
  ): Promise<void> {

    await prisma.$transaction(async (tx) => {

      await tx.account.update({
        where: {
          id: senderId
        },
        data: {
          balance: {
            decrement: amount
          }
        }
      });

      await tx.account.update({
        where: {
          id: receiverId
        },
        data: {
          balance: {
            increment: amount
          }
        }
      });

      await tx.transaction.create({
        data: {
          id: crypto.randomUUID(),
          senderId,
          receiverId,
          amount,
          type: "TRANSFER"
        }
      });

    });

  }

}