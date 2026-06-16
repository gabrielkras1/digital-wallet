export interface ITransactionRepository {

  save(
    transaction: Transaction
  ): Promise<void>;

  findByAccountId(
    accountId: string
  ): Promise<any[]>;

}