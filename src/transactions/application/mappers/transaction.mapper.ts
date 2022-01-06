import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionTypeORM } from '../../infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { AccountIdFromTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/account-id-from.typeorm';
import { AmountTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/amount.typeorm';

export class TransactionMapper {
  public static toTypeORM(transaction: Transaction): TransactionTypeORM {
    const transactionTypeORM: TransactionTypeORM = new TransactionTypeORM();
    transactionTypeORM.type = transaction.getType();
    transactionTypeORM.status = transaction.getStatus();
    transactionTypeORM.accountIdFrom = AccountIdFromTypeORM.from(transaction.getAccountFrom().getValue());
    transactionTypeORM.accountIdTo = transaction.getAccountTo() != null ? AccountIdFromTypeORM.from(transaction.getAccountTo().getValue()) : null;
    transactionTypeORM.amount = AmountTypeORM.from(transaction.getAmount().getAmount(), transaction.getAmount().getCurrency());
    return transactionTypeORM;
  }
}