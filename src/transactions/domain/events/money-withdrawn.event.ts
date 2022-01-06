import { TransactionStatus } from '../enums/transaction.status.enum';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';

export class MoneyWithdrawn {
  constructor(
    public readonly transactionId: number,
    public readonly accountIdFrom: number,
    public readonly amount: number,
    public readonly status: TransactionStatus,
    public readonly createdAt: DateTime
  ) {
  }
}