import { Router } from "express";

import { PrismaAccountRepository } from "../../infrastructure/repositories/PrismaAccountRepository";
import { PrismaTransactionRepository } from "../../infrastructure/repositories/PrismaTransactionRepository";
import { PrismaTransferRepository } from "../../infrastructure/repositories/PrismaTransferRepository";

import { TransferFundsUseCase } from "../../application/use-cases/TransferFundsUseCase";
import { CreateAccountUseCase } from "../../application/use-cases/CreateAccountUseCase";
import { DepositUseCase } from "../../application/use-cases/DepositUseCase";
import { WithdrawUseCase } from "../../application/use-cases/WithdrawUseCase";

import { TransferController } from "../controllers/TransferController";
import { CreateAccountController } from "../controllers/CreateAccountController";
import { DepositController } from "../controllers/DepositController";
import { WithdrawController } from "../controllers/WithdrawController";

const router = Router();

/*
|--------------------------------------------------------------------------
| Repositories
|--------------------------------------------------------------------------
*/

const accountRepository =
  new PrismaAccountRepository();

const transactionRepository =
  new PrismaTransactionRepository();

const transferRepository =
  new PrismaTransferRepository();

/*
|--------------------------------------------------------------------------
| Use Cases
|--------------------------------------------------------------------------
*/

const transferUseCase =
  new TransferFundsUseCase(
    accountRepository,
    transferRepository
  );

const createAccountUseCase =
  new CreateAccountUseCase(
    accountRepository
  );

const depositUseCase =
  new DepositUseCase(
    accountRepository
  );

const withdrawUseCase =
  new WithdrawUseCase(
    accountRepository
  );

/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
*/

const transferController =
  new TransferController(
    transferUseCase
  );

const createAccountController =
  new CreateAccountController(
    createAccountUseCase
  );

const depositController =
  new DepositController(
    depositUseCase
  );

const withdrawController =
  new WithdrawController(
    withdrawUseCase
  );

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

// Criar conta
router.post(
  "/accounts",
  createAccountController.handle
);

// Depositar
router.post(
  "/deposit",
  depositController.handle
);

// Sacar
router.post(
  "/withdraw",
  withdrawController.handle
);

// Transferir
router.post(
  "/transfer",
  transferController.handle
);

// Consultar saldo de uma conta
router.get(
  "/account/:id",
  async (req, res): Promise<void> => {

    const account =
      await accountRepository.findById(
        req.params.id
      );

    if (!account) {
      res.status(404).json({
        error: "Conta não encontrada"
      });
      return;
    }

    res.json({
      id: account.id,
      document: account.document,
      balance:
        account.getBalance().value
    });

  }
);

// Histórico de transações
router.get(
  "/transactions/:id",
  async (req, res): Promise<void> => {

    const transactions =
      await transactionRepository.findByAccountId(
        req.params.id
      );

    res.json(transactions);

  }
);

router.get(
  "/accounts",
  async (req, res): Promise<void> => {

    const accounts =
      await accountRepository.findAll();

    res.json(
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

export default router;