import { Request, Response } from "express";

import { CreateAccountUseCase }
from "../../application/use-cases/CreateAccountUseCase";

export class CreateAccountController {

  constructor(
    private useCase: CreateAccountUseCase
  ) {}

  handle = async (
    req: Request,
    res: Response
  ) => {

    try {

      const { document } = req.body;

      const result =
        await this.useCase.execute(
          document
        );

      return res.status(201).json(
        result
      );

    } catch (error: any) {

      return res.status(400).json({
        error: error.message
      });

    }

  };
}