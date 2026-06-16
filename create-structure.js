const fs = require('fs');

const folders = [

'src',

'src/domain',
'src/domain/entities',
'src/domain/value-objects',
'src/domain/repositories',
'src/domain/errors',

'src/application',
'src/application/use-cases',

'src/infrastructure',
'src/infrastructure/database',
'src/infrastructure/database/prisma',
'src/infrastructure/repositories',

'src/presentation',
'src/presentation/controllers',
'src/presentation/routes'
];

folders.forEach(folder => {
  fs.mkdirSync(folder, { recursive: true });
});

const files = [

'src/domain/entities/Account.ts',
'src/domain/entities/Transaction.ts',

'src/domain/value-objects/Money.ts',
'src/domain/value-objects/Document.ts',

'src/domain/repositories/IAccountRepository.ts',
'src/domain/repositories/ITransactionRepository.ts',

'src/domain/errors/InsufficientFundsError.ts',
'src/domain/errors/InvalidDocumentError.ts',

'src/application/use-cases/TransferFundsUseCase.ts',
'src/application/use-cases/DepositUseCase.ts',
'src/application/use-cases/WithdrawUseCase.ts',

'src/infrastructure/database/prisma/prisma.ts',

'src/infrastructure/repositories/PrismaAccountRepository.ts',
'src/infrastructure/repositories/PrismaTransactionRepository.ts',

'src/presentation/controllers/TransferController.ts',

'src/presentation/routes/account.routes.ts',

'src/server.ts'
];

files.forEach(file => {

  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '');
  }

});

console.log('Projeto criado com sucesso!');