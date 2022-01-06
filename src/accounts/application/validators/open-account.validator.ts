import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { AccountTypeORM } from '../../infrastructure/persistence/typeorm/entities/account.typeorm';
import { OpenAccountRequest } from '../dtos/request/open-account-request.dto';

@Injectable()
export class OpenAccountValidator {
  constructor(@InjectRepository(AccountTypeORM) private accountRepository: Repository<AccountTypeORM>) {}

  public async validate(openAccountRequestDto: OpenAccountRequest): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const number: string = openAccountRequestDto.number.trim();
    if (number.length <= 0) {
      notification.addError('Account number is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const accountTypeORM: AccountTypeORM = await this.accountRepository.createQueryBuilder().where("number = :number", { number }).getOne();
    if (accountTypeORM != null) {
      notification.addError('Account number is taken', null);
    }
    return notification;
  }
}