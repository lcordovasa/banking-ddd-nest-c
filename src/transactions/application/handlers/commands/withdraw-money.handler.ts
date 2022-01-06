import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountTypeORM } from '../../../../accounts/infrastructure/persistence/typeorm/entities/account.typeorm';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { WithdrawMoney } from '../../commands/withdraw-money.command';
import { TransactionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { AccountId } from '../../../../accounts/domain/value-objects/account-id.value';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionFactory } from '../../../domain/factories/transaction.factory';
import { TransactionMapper } from '../../mappers/transaction.mapper';
import { TransactionStatus } from '../../../domain/enums/transaction.status.enum';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';
import { TransactionId } from '../../../domain/value-objects/transaction-id.value';

@CommandHandler(WithdrawMoney)
export class WithdrawMoneyHandler
  implements ICommandHandler<WithdrawMoney> {
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    @InjectRepository(TransactionTypeORM)
    private transactionRepository: Repository<TransactionTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: WithdrawMoney) {
    let transactionId: number = 0;
    const accountNumber: string = command.accountNumber.trim();
    const accountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where("number = :number")
      .setParameter("number", accountNumber)
      .getOne();
    if (accountTypeORM == null) {
      return transactionId;
    }
    const accountFrom: AccountId = AccountId.of(accountTypeORM.id);
    const amount: Money = Money.create(command.amount, Currency.SOLES);
    let transaction: Transaction = TransactionFactory.createFrom(TransactionType.WITHDRAW, TransactionStatus.STARTED, accountFrom, null, amount, null);
    let transactionTypeORM: TransactionTypeORM = TransactionMapper.toTypeORM(transaction);
    transactionTypeORM = await this.transactionRepository.save(transactionTypeORM);
    if (transactionTypeORM == null) {
      return transactionId;
    }
    transactionId = Number(transactionTypeORM.id);
    transaction.changeId(TransactionId.of(transactionId));
    transaction = this.publisher.mergeObjectContext(transaction);
    transaction.withdraw();
    transaction.commit();
    return transactionId;
  }
}