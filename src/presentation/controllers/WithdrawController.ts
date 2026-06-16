import { Request, Response } from "express";
import { WithdrawUseCase } from "../../application/use-cases/WithdrawUseCase";

export class WithdrawController {
  constructor(
    private useCase: WithdrawUseCase
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
        message: "Saque realizado"
      });

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }
  };
}