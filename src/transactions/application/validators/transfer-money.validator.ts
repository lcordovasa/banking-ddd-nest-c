import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { AccountTypeORM } from '../../../accounts/infrastructure/persistence/typeorm/entities/account.typeorm';
import { TransferRequestDto } from '../dtos/request/transfer-request.dto';

@Injectable()
export class TransferMoneyValidator {
  constructor(@InjectRepository(AccountTypeORM) private accountRepository: Repository<AccountTypeORM>) {}

  public async validate(transferRequestDto: TransferRequestDto): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const fromAccountNumber: string = transferRequestDto.fromAccountNumber.trim();
    if (fromAccountNumber.length <= 0) {
      notification.addError('From account number is required', null);
    }
    const toAccountNumber: string = transferRequestDto.toAccountNumber.trim();
    if (toAccountNumber.length <= 0) {
      notification.addError('To account number is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const fromAccountTypeORM: AccountTypeORM = await this.accountRepository.createQueryBuilder()
      .where("number = :number")
      .setParameter("number", fromAccountNumber)
      .getOne();
    if (fromAccountTypeORM == null) {
      notification.addError('From account number not found', null);
    }
    const toAccountTypeORM: AccountTypeORM = await this.accountRepository.createQueryBuilder()
      .where("number = :number")
      .setParameter("number", toAccountNumber)
      .getOne();
    if (toAccountTypeORM == null) {
      notification.addError('To account number not found', null);
    }
    const amount: number = transferRequestDto.amount;
    if (amount <= 0) {
      notification.addError('Amount must be greater than zero', null);
    }
    return notification;
  }
}