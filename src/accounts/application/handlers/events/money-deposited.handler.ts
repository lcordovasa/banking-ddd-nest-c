import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { MoneyDeposited } from '../../../../transactions/domain/events/money-deposited.event';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountTypeORM } from '../../../infrastructure/persistence/typeorm/entities/account.typeorm';
import { getManager, Repository } from 'typeorm';
import { AccountMapper } from '../../mappers/account.mapper';
import { Account } from '../../../domain/entities/account.entity';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { AccountNumber } from '../../../domain/value-objects/account-number.value';
import { AccountFactory } from '../../../domain/factories/account.factory';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { CustomerId } from '../../../../customers/domain/value-objects/customer-id.value';
import { AccountId } from '../../../domain/value-objects/account-id.value';
import { CompleteTransaction } from '../../../../transactions/application/commands/complete-transaction.command';

@EventsHandler(MoneyDeposited)
export class MoneyDepositedHandler implements IEventHandler<MoneyDeposited> {
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    private commandBus: CommandBus
  ) {}

  async handle(event: MoneyDeposited) {
    let accountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .where("id = :id")
      .setParameter("id", Number(event.accountIdFrom))
      .getOne();
    if (accountTypeORM == null) {
      console.log('MoneyDeposited accountTypeORM not found');
      return;
    }
    const accountNumberResult: Result<AppNotification, AccountNumber> = AccountNumber.create(accountTypeORM.number.value);
    if (accountNumberResult.isFailure()) {
      return;
    }
    const accountAmount: Money = Money.create(accountTypeORM.balance.balance, accountTypeORM.balance.currency);
    let account: Account = AccountFactory.withId(AccountId.of(accountTypeORM.id), accountNumberResult.value, accountAmount, CustomerId.of(accountTypeORM.customerId.value), null);
    const depositAmount: Money = Money.create(event.amount, Currency.SOLES);
    const depositResult: Result<AppNotification, Account> = account.deposit(depositAmount);
    if (depositResult.isFailure()) {
      console.log('MoneyDeposited error');
      return;
    }
    accountTypeORM = AccountMapper.toTypeORM(account);
    await getManager().transaction(async transactionalEntityManager => {
      accountTypeORM = await this.accountRepository.save(accountTypeORM);
      if (accountTypeORM == null) {
        console.log('MoneyDeposited error');
        return;
      }
      const completeTransaction: CompleteTransaction = new CompleteTransaction(event.transactionId);
      await this.commandBus.execute(completeTransaction);
    });
  }
}