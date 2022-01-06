import { Money } from '../../../common/domain/value-objects/money.value';
import { AggregateRoot } from '@nestjs/cqrs';
import { TransactionId } from '../value-objects/transaction-id.value';
import { AccountId } from '../../../accounts/domain/value-objects/account-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionStatus } from '../enums/transaction.status.enum';
import { MoneyDeposited } from '../events/money-deposited.event';
import { MoneyWithdrawn } from '../events/money-withdrawn.event';
import { MoneyTransferred } from '../events/money-transferred.event';

export class Transaction extends AggregateRoot {
  private id: TransactionId;
  private readonly type: TransactionType;
  private readonly status: TransactionStatus;
  private readonly accountFrom: AccountId;
  private readonly accountTo: AccountId;
  private readonly amount: Money;
  private readonly auditTrail: AuditTrail;

  public constructor(type: TransactionType, status: TransactionStatus, accountFrom: AccountId, accountTo: AccountId, amount: Money, auditTrail: AuditTrail) {
    super();
    this.type = type;
    this.status = status;
    this.accountFrom = accountFrom;
    this.accountTo = accountTo;
    this.amount = amount;
    this.auditTrail = auditTrail;
  }

  public deposit() {
    const event = new MoneyDeposited(this.id.getValue(), this.accountFrom.getValue(), this.amount.getAmount(), this.status, null);
    this.apply(event);
  }

  public withdraw() {
    const event = new MoneyWithdrawn(this.id.getValue(), this.accountFrom.getValue(), this.amount.getAmount(), this.status, null);
    this.apply(event);
  }

  public transfer() {
    const event = new MoneyTransferred(this.id.getValue(), this.accountFrom.getValue(), this.accountTo.getValue(), this.amount.getAmount(), this.status, null);
    this.apply(event);
  }

  public getId(): TransactionId {
    return this.id;
  }

  public getType(): TransactionType {
    return this.type;
  }

  public getStatus(): TransactionStatus {
    return this.status;
  }

  public getAccountFrom(): AccountId {
    return this.accountFrom;
  }

  public getAccountTo(): AccountId {
    return this.accountTo;
  }

  public getAmount(): Money {
    return this.amount;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: TransactionId) {
    this.id = id;
  }
}