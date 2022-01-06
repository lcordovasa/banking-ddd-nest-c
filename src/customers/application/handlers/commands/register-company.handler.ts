import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterCompany } from 'src/customers/application/commands/register-company.command';
import { Repository } from 'typeorm';
import { CustomerId } from '../../../domain/value-objects/customer-id.value';
import { Ruc } from '../../../domain/value-objects/ruc.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { CompanyMapper } from '../../mappers/company.mapper';
import { CompanyName } from '../../../../common/domain/value-objects/company-name.value';
import { CompanyFactory } from '../../../domain/factories/company.factory';
import { Company } from '../../../domain/entities/company.entity';
import { CompanyTypeORM } from '../../../infrastructure/persistence/typeorm/entities/company.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';

@CommandHandler(RegisterCompany)
export class RegisterCompanyHandler
  implements ICommandHandler<RegisterCompany> {
  constructor(
    @InjectRepository(CompanyTypeORM)
    private companyRepository: Repository<CompanyTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterCompany) {
    let customerId: number = 0;
    const companyNameResult: Result<AppNotification, CompanyName> = CompanyName.create(command.name);
    if (companyNameResult.isFailure()) {
      return customerId;
    }
    const rucResult: Result<AppNotification, Ruc> = Ruc.create(command.ruc);
    if (rucResult.isFailure()) {
      return customerId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );
    let company: Company = CompanyFactory.createFrom(companyNameResult.value, rucResult.value, auditTrail);
    let companyTypeORM: CompanyTypeORM = CompanyMapper.toTypeORM(company);
    companyTypeORM = await this.companyRepository.save(companyTypeORM);
    if (companyTypeORM == null) {
      return customerId;
    }
    customerId = Number(companyTypeORM.id);
    company.changeId(CustomerId.of(customerId));
    company = this.publisher.mergeObjectContext(company);
    company.register();
    company.commit();
    return customerId;
  }
}