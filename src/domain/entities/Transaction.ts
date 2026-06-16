export enum TransactionType {
  TRANSFER = "TRANSFER",
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW"
}

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly senderId: string,
    public readonly receiverId: string,
    public readonly amount: number,
    public readonly type: TransactionType,
    public readonly createdAt: Date
  ) {}
}