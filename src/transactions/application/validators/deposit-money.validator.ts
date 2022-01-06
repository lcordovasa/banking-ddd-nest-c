import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { DepositRequestDto } from '../dtos/request/deposit-request.dto';
import { AccountTypeORM } from '../../../accounts/infrastructure/persistence/typeorm/entities/account.typeorm';

@Injectable()
export class DepositMoneyValidator {
  constructor(@InjectRepository(AccountTypeORM) private accountRepository: Repository<AccountTypeORM>) {}

  public async validate(depositRequestDto: DepositRequestDto): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const accountNumber: string = depositRequestDto.accountNumber.trim();
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
    const amount: number = depositRequestDto.amount;
    if (amount <= 0) {
      notification.addError('Amount must be greater than zero', null);
    }
    return notification;
  }
}