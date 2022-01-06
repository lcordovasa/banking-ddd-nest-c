import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { AccountTypeORM } from '../../../accounts/infrastructure/persistence/typeorm/entities/account.typeorm';
import { WithdrawRequestDto } from '../dtos/request/withdraw-request.dto';

@Injectable()
export class WithdrawMoneyValidator {
  constructor(@InjectRepository(AccountTypeORM) private accountRepository: Repository<AccountTypeORM>) {}

  public async validate(withdrawRequestDto: WithdrawRequestDto): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const accountNumber: string = withdrawRequestDto.accountNumber.trim();
    if (accountNumber.length <= 0) {
      notification.addError('Account number is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const accountTypeORM: AccountTypeORM = await this.accountRepository.createQueryBuilder()
      .where("number = :number")
      .setParameter("number", accountNumber)
      .getOne();
    if (accountTypeORM == null) {
      notification.addError('Account number not found', null);
    }
    const amount: number = withdrawRequestDto.amount;
    if (amount <= 0) {
      notification.addError('Amount must be greater than zero', null);
    }
    return notification;
  }
}