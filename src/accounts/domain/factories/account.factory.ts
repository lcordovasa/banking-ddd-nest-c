import { CustomerId } from '../../../customers/domain/value-objects/customer-id.value';
import { Money } from '../../../common/domain/value-objects/money.value';
import { Account } from '../entities/account.entity';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { AccountNumber } from '../value-objects/account-number.value';
import { AccountId } from '../value-objects/account-id.value';

export class AccountFactory {
  public static createFrom(number: AccountNumber, balance: Money, customerId: CustomerId, auditTrail: AuditTrail): Account {
    return new Account(number, balance, customerId, auditTrail);
  }

  public static withId(accountId: AccountId, number: AccountNumber, balance: Money, customerId: CustomerId, auditTrail: AuditTrail): Account {
    let account: Account = new Account(number, balance, customerId, auditTrail);
    account.changeId(accountId);
    return account;
  }
}