import { Router } from "express";

import { PrismaAccountRepository } from "../../infrastructure/repositories/PrismaAccountRepository";
import { PrismaTransactionRepository } from "../../infrastructure/repositories/PrismaTransactionRepository";

import { TransferFundsUseCase } from "../../application/use-cases/TransferFundsUseCase";

import { TransferController } from "../controllers/TransferController";

import { CreateAccountUseCase }
from "../../application/use-cases/CreateAccountUseCase";

import { CreateAccountController }
from "../controllers/CreateAccountController";

import { DepositUseCase }
from "../../application/use-cases/DepositUseCase";

import { DepositController }
from "../controllers/DepositController";

import { WithdrawUseCase }
from "../../application/use-cases/WithdrawUseCase";

import { WithdrawController }
from "../controllers/WithdrawController";

const router = Router();

const accountRepository =
  new PrismaAccountRepository();

const transactionRepository =
  new PrismaTransactionRepository();

const transferUseCase =
  new TransferFundsUseCase(
    accountRepository,
    transactionRepository
  );

const transferController =
  new TransferController(
    transferUseCase
  );

const createAccountUseCase =
  new CreateAccountUseCase(
    accountRepository
  );

const createAccountController =
  new CreateAccountController(
    createAccountUseCase
  );

const depositUseCase =
  new DepositUseCase(
    accountRepository
  );

const depositController =
  new DepositController(
    depositUseCase
  );

const withdrawUseCase =
  new WithdrawUseCase(
    accountRepository
  );

const withdrawController =
  new WithdrawController(
    withdrawUseCase
  );

router.post(
  "/transfer",
  transferController.handle
);

router.post(
  "/accounts",
  createAccountController.handle
);

router.post(
  "/deposit",
  depositController.handle
);

router.post(
  "/withdraw",
  withdrawController.handle
);



export default router;


router.get(
  "/account/:id",
  async (req, res) => {

    const account =
      await accountRepository.findById(
        req.params.id
      );

    return res.json({
      id: account?.id,
      balance:
      account?.getBalance().value
    });

  }
);

router.get(
  "/transactions/:id",
  async (req, res) => {

    const transactions =
      await transactionRepository
      .findByAccountId(
        req.params.id
      );

    return res.json(
      transactions
    );

  }
);

router.get(
  "/accounts",
  async (req, res) => {

    const accounts =
      await accountRepository.findAll();

    return res.json(
      accounts.map(
        account => ({
          id: account.id,
          document: account.document,
          balance:
            account.getBalance().value
        })
      )
    );

  }
);