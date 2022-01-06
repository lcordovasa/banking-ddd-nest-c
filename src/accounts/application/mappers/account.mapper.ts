import { AccountTypeORM } from '../../infrastructure/persistence/typeorm/entities/account.typeorm';
import { Account } from '../../domain/entities/account.entity';
import { AccountNumberTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/account-number.typeorm';
import { CustomerIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/customer-id.typeorm';
import { BalanceTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/balance.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class AccountMapper {
  public static toTypeORM(account: Account): AccountTypeORM {
    const accountTypeORM: AccountTypeORM = new AccountTypeORM();
    accountTypeORM.id = account.getId() != null ? account.getId().getValue() : 0;
    accountTypeORM.number = account.getNumber() != null ? AccountNumberTypeORM.from(account.getNumber().getValue()) : null;
    accountTypeORM.balance = account.getBalance() != null ? BalanceTypeORM.from(account.getBalance().getAmount(), account.getBalance().getCurrency()) : null;
    accountTypeORM.customerId = account.getCustomerId() != null ? CustomerIdTypeORM.from(account.getCustomerId().getValue()) : null;
    accountTypeORM.auditTrail = account.getAuditTrail() != null ? AuditTrailTypeORM.from(
      account.getAuditTrail().getCreatedAt().format(),
      account.getAuditTrail().getCreatedBy().getValue(),
      account.getAuditTrail().getUpdatedAt().format(),
      account.getAuditTrail().getUpdatedBy().getValue()) : null;
    return accountTypeORM;
  }
}