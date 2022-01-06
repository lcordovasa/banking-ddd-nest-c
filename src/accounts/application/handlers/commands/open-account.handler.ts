import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { OpenAccount } from '../../commands/open-account.command';
import { AccountTypeORM } from '../../../infrastructure/persistence/typeorm/entities/account.typeorm';
import { AccountNumber } from '../../../domain/value-objects/account-number.value';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { AccountFactory } from '../../../domain/factories/account.factory';
import { Account } from '../../../domain/entities/account.entity';
import { AccountMapper } from '../../mappers/account.mapper';
import { CustomerId } from '../../../../customers/domain/value-objects/customer-id.value';
import { AccountId } from '../../../domain/value-objects/account-id.value';

@CommandHandler(OpenAccount)
export class OpenAccountHandler
  implements ICommandHandler<OpenAccount> {
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: OpenAccount) {
    let accountId: number = 0;
    const accountNumberResult: Result<AppNotification, AccountNumber> = AccountNumber.create(command.number);
    if (accountNumberResult.isFailure()) {
      return accountId;
    }
    const balance: Money = Money.create(0, Currency.SOLES);
    const customerId: CustomerId = CustomerId.of(command.customerId);
    let account: Account = AccountFactory.createFrom(accountNumberResult.value, balance, customerId, null);
    let accountTypeORM: AccountTypeORM = AccountMapper.toTypeORM(account);
    accountTypeORM = await this.accountRepository.save(accountTypeORM);
    if (accountTypeORM == null) {
      return accountId;
    }
    accountId = Number(accountTypeORM.id);
    account.changeId(AccountId.of(accountId));
    account = this.publisher.mergeObjectContext(account);
    account.open();
    account.commit();
    return accountId;
  }
}