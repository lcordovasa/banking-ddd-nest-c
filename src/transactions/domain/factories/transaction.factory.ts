import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionStatus } from '../enums/transaction.status.enum';
import { AccountId } from '../../../accounts/domain/value-objects/account-id.value';
import { Transaction } from '../entities/transaction.entity';
import { Money } from '../../../common/domain/value-objects/money.value';

export class TransactionFactory {
  public static createFrom(
    type: TransactionType, status: TransactionStatus, accountIdFrom: AccountId, accountIdTo: AccountId, amount: Money, auditTrail: AuditTrail): Transaction {
    return new Transaction(type, status, accountIdFrom, accountIdTo, amount, auditTrail);
  }
}