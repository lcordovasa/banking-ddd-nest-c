import { Account } from '../entities/account.entity';
import { Money } from '../../../common/domain/value-objects/money.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class MoneyTransferService {
  public transfer(fromAccount: Account, toAccount: Account, amount: Money) {
    //fromAccount.withdraw();
    //toAccount.deposit();
  }
}