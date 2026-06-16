import { Account } from "../entities/Account";

export interface IAccountRepository {
  findById(id: string): Promise<Account | null>;

  findByDocument(document: string): Promise<Account | null>;

  findAll(): Promise<Account[]>;

  create(account: Account): Promise<void>;

  save(account: Account): Promise<void>;
}