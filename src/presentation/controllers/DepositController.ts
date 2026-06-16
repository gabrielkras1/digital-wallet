import { Request, Response } from "express";

import { DepositUseCase }
from "../../application/use-cases/DepositUseCase";

export class DepositController {

  constructor(
    private useCase: DepositUseCase
  ) {}

  handle = async (
    req: Request,
    res: Response
  ) => {

    try {

      const {
        accountId,
        amount
      } = req.body;

      await this.useCase.execute(
        accountId,
        amount
      );

      return res.json({
        message: "Depósito realizado"
      });

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  };
}