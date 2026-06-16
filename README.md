# Digital Wallet

Carteira digital desenvolvida utilizando Node.js, TypeScript, Prisma e SQLite.

## Arquitetura

### Domain

- Account
- Transaction
- Money
- Document

### Application

- CreateAccountUseCase
- DepositUseCase
- WithdrawUseCase
- TransferFundsUseCase

### Infrastructure

- PrismaAccountRepository
- PrismaTransactionRepository

### Presentation

- Controllers
- Routes

## SOLID

### SRP

Cada Use Case possui uma única responsabilidade.

### DIP

Os casos de uso dependem de interfaces.

### OCP

Novos tipos de transação podem ser adicionados sem alterar as existentes.

## Segurança

Transferências utilizam regras encapsuladas na entidade Account.

A validação de saldo não ocorre nos controllers.

## Banco

SQLite + Prisma ORM