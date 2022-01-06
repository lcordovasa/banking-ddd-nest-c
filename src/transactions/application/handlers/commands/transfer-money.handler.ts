import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountTypeORM } from '../../../../accounts/infrastructure/persistence/typeorm/entities/account.typeorm';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { TransferMoney } from '../../commands/transfer-money.command';
import { AccountId } from '../../../../accounts/domain/value-objects/account-id.value';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionFactory } from '../../../domain/factories/transaction.factory';
import { TransactionStatus } from '../../../domain/enums/transaction.status.enum';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';
import { TransactionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { TransactionId } from '../../../domain/value-objects/transaction-id.value';
import { TransactionMapper } from '../../mappers/transaction.mapper';

@CommandHandler(TransferMoney)
export class TransferMoneyHandler
  implements ICommandHandler<TransferMoney> {
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    @InjectRepository(TransactionTypeORM)
    private transactionRepository: Repository<TransactionTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: TransferMoney) {
    let transactionId: number = 0;
    const fromAccountNumber: string = command.fromAccountNumber.trim();
    const fromAccountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where("number = :number")
      .setParameter("number", fromAccountNumber)
      .getOne();
    if (fromAccountTypeORM == null) {
      return transactionId;
    }
    const toAccountNumber: string = command.toAccountNumber.trim();
    const toAccountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where("number = :number")
      .setParameter("number", toAccountNumber)
      .getOne();
    if (toAccountTypeORM == null) {
      return transactionId;
    }
    const accountIdFrom: AccountId = AccountId.of(fromAccountTypeORM.id);
    const accountIdTo: AccountId = AccountId.of(toAccountTypeORM.id);
    const amount: Money = Money.create(command.amount, Currency.SOLES);
    let transaction: Transaction = TransactionFactory.createFrom(TransactionType.TRANSFER, TransactionStatus.STARTED, accountIdFrom, accountIdTo, amount, null);
    let transactionTypeORM: TransactionTypeORM = TransactionMapper.toTypeORM(transaction);
    transactionTypeORM = await this.transactionRepository.save(transactionTypeORM);
    if (transactionTypeORM == null) {
      return transactionId;
    }
    transactionId = Number(transactionTypeORM.id);
    transaction.changeId(TransactionId.of(transactionId));
    transaction = this.publisher.mergeObjectContext(transaction);
    transaction.transfer();
    transaction.commit();
    return transactionId;
  }
}