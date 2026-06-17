import { Request, Response } from "express";

import { TransferFundsUseCase }
from "../../application/use-cases/TransferFundsUseCase";

export class TransferController {

  constructor(
    private useCase: TransferFundsUseCase
  ) {}

  handle = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    try {

      const {
        senderId,
        receiverId,
        amount
      } = req.body;

      await this.useCase.execute(
        senderId,
        receiverId,
        amount
      );

      res.status(200).json({
        message: "Transferência realizada"
      });

    } catch (error: any) {

      res.status(400).json({
        error: error.message
      });

    }

  };

}