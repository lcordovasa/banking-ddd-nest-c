import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { CustomerTypeORM } from '../../infrastructure/persistence/typeorm/entities/customer.typeorm';
import { CompanyTypeORM } from '../../infrastructure/persistence/typeorm/entities/company.typeorm';
import { RegisterCompanyRequest } from '../dtos/request/register-company-request.dto';

@Injectable()
export class RegisterCompanyValidator {
  constructor(
    @InjectRepository(CompanyTypeORM)
    private companyRepository: Repository<CompanyTypeORM>,
  ) {
  }

  public async validate(
    registerCompanyRequest: RegisterCompanyRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const name: string = registerCompanyRequest.name.trim();
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    const ruc: string = registerCompanyRequest.ruc.trim();
    if (ruc.length <= 0) {
      notification.addError('ruc is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const customer: CustomerTypeORM = await this.companyRepository.createQueryBuilder().where("ruc = :ruc", { ruc }).getOne();
    if (customer != null) {
      notification.addError('ruc is taken', null);
    }
    return notification;
  }
}