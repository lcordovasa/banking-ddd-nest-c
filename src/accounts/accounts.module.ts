import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountTypeORM } from './infrastructure/persistence/typeorm/entities/account.typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './api/accounts.controller';
import { AccountOpenedHandler } from './application/handlers/events/accout-opened.handler';
import { AccountsApplicationService } from './application/services/accounts-application.service';
import { OpenAccountValidator } from './application/validators/open-account.validator';
import { GetAccountsHandler } from './application/handlers/queries/get-accounts.handler';
import { GetAccountByIdHandler } from './application/handlers/queries/get-account-by-id.handler';
import { MoneyDepositedHandler } from './application/handlers/events/money-deposited.handler';
import { OpenAccountHandler } from './application/handlers/commands/open-account.handler';
import { MoneyWithdrawnHandler } from './application/handlers/events/money-withdrawn.handler';
import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';

export const CommandHandlers = [OpenAccountHandler];
export const EventHandlers = [AccountOpenedHandler, MoneyDepositedHandler, MoneyWithdrawnHandler, MoneyTransferredHandler];
export const QueryHandlers = [GetAccountsHandler, GetAccountByIdHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([AccountTypeORM]),
  ],
  controllers: [AccountsController],
  providers: [
    AccountsApplicationService,
    OpenAccountValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class AccountsModule {}