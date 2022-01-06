import { Module } from '@nestjs/common';
import { CustomersController } from './api/customers.controller';
import { CompanyApplicationService } from './application/services/company-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterPersonValidator } from './application/validators/register-person.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterCompanyHandler } from './application/handlers/commands/register-company.handler';
import { PersonRegisteredHandler } from './application/handlers/events/person-registered.handler';
import { GetCustomersPersonHandler } from './application/handlers/queries/get-customers-person.handler';
import { PersonApplicationService } from './application/services/person-application.service';
import { RegisterCompanyValidator } from './application/validators/register-company.validator';
import { RegisterPersonHandler } from './application/handlers/commands/register-person.handler';
import { CompanyTypeORM } from './infrastructure/persistence/typeorm/entities/company.typeorm';
import { PersonTypeORM } from './infrastructure/persistence/typeorm/entities/person.typeorm';
import { CustomerTypeORM } from './infrastructure/persistence/typeorm/entities/customer.typeorm';
import { CompanyRegisteredHandler } from './application/handlers/events/company-registered.handler';
import { GetCustomersCompanyHandler } from './application/handlers/queries/get-customers-company.handler';
import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';

export const CommandHandlers = [RegisterPersonHandler, RegisterCompanyHandler];
export const EventHandlers = [PersonRegisteredHandler, CompanyRegisteredHandler, MoneyTransferredHandler];
export const QueryHandlers = [GetCustomersPersonHandler, GetCustomersCompanyHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CustomerTypeORM, PersonTypeORM, CompanyTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [CustomersController],
  providers: [
    PersonApplicationService,
    CompanyApplicationService,
    RegisterPersonValidator,
    RegisterCompanyValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class CustomersModule {}