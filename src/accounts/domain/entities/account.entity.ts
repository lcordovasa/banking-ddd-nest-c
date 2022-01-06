import { CustomerId } from '../../../customers/domain/value-objects/customer-id.value';
import { Money } from '../../../common/domain/value-objects/money.value';
import { AppNotification } from '../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { AggregateRoot } from '@nestjs/cqrs';
import { AccountId } from '../value-objects/account-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { AccountNumber } from '../value-objects/account-number.value';
import { AccountOpened } from '../events/account-opened.event';

export class Account extends AggregateRoot {
  private id: AccountId;
  private readonly number: AccountNumber;
  private balance: Money;
  private readonly customerId: CustomerId;
  private readonly auditTrail: AuditTrail;

  public constructor(number: AccountNumber, balance: Money, customerId: CustomerId, auditTrail: AuditTrail) {
    super();
    this.number = number;
    this.balance = balance;
    this.customerId = customerId;
    this.auditTrail = auditTrail;
  }

  public open() {
    const event = new AccountOpened(this.id.getValue(), this.number.getValue(), this.customerId.getValue());
    this.apply(event);
  }

  public deposit(amount: Money): Result<AppNotification, Account> {
    const notification: AppNotification = this.validate(amount);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    this.balance = this.balance.add(amount);
    return Result.ok(this);
  }

  public withdraw(amount: Money): Result<AppNotification, Account> {
    const notification: AppNotification = this.validate(amount);
    if (this.balance.getAmount() < amount.getAmount()) {
      notification.addError('Cannot withdraw in the account, amount is greater than balance', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    this.balance = this.balance.subtract(amount);
    return Result.ok(this);
  }

  public validate(amount: Money): AppNotification {
    const notification: AppNotification = new AppNotification();
    if (amount.getAmount() <= 0) {
      notification.addError('The amount must be greater than zero', null);
    }
    if (!this.hasIdentity()) {
      notification.addError('The account has no identity', null);
    }
    return notification;
  }

  public exist(): boolean {
    return this.id != null && this.id.getValue() > 0;
  }

  public doesNotExist(): boolean {
    return !this.exist();
  }

  public hasIdentity(): boolean {
    return this.number.getValue().trim().length > 0;
  }

  public getId(): AccountId {
    return this.id;
  }

  public getNumber(): AccountNumber {
    return this.number;
  }

  public getBalance(): Money {
    return this.balance;
  }

  public getCustomerId(): CustomerId {
    return this.customerId;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: AccountId) {
    this.id = id;
  }
}